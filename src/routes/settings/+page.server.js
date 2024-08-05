import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const settingsSchema = z
	.object({
		firstName: z
			.string({ required_error: 'First name is required' })
			.min(1, {
				message: 'First name is required'
			})
			.max(32, {
				message: 'First name must be less than 32 characters'
			})
			.trim(),
		lastName: z
			.string({ required_error: 'Last name is required' })
			.min(1, {
				message: 'Last name is required'
			})
			.max(32, {
				message: 'Last name must be less than 32 characters'
			})
			.trim(),
		username: z
			.string({ required_error: 'Username is required' })
			.min(1, { message: 'Username is required' })
			.max(16, { message: 'Username must be less than 16 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, {
				message: 'Email is required'
			})
			.max(64, {
				message: 'Email must be less than 64 characters'
			})
			.email({ message: 'Invalid email' }),
		bio: z
			.string()
			.max(200, {
				message: 'Your bio should be less than 200 characters'
			})
			.optional()
			.or(z.literal('')),
		password: z
			.string()
			.min(8, {
				message: 'Password must be at least 8 characters'
			})
			.max(32, {
				message: 'Password must be less than 32 characters'
			})
			.optional()
			.or(z.literal('')),
		confirmPassword: z.string().optional().or(z.literal(''))
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			return ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}
	});

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async ({ cookies, locals }) => {
		cookies.delete('token', { path: '/' });
		locals.user = null;
		throw redirect(302, '/');
	},
	save: async ({ request, cookies, locals }) => {
		if (!cookies.get('token')) {
			console.error('No token found');
			throw redirect(302, '/login');
		}

		if (!locals.user || !locals.user.userId) {
			console.error('No user data found');
			throw redirect(302, '/login');
		}

		const formData = Object.fromEntries(await request.formData());
		try {
			const result = settingsSchema.parse(formData);
		} catch (err) {
			const { fieldErrors } = err.flatten();
			const { password, confirmPassword, ...rest } = formData;

			return fail(400, {
				data: rest,
				errors: fieldErrors
			});
		}

		const { confirmPassword, ...updateUser } = formData;
		const api_url = 'http://localhost:3000';

		try {
			const response = await fetch(`${api_url}/users/${locals.user.userId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('token')}`
				},
				body: JSON.stringify(updateUser)
			});

			const responseData = await response.json();

			if (!response.ok) {
				if (response.status === 409) {
					return fail(409, {
						data: updateUser,
						errors: { conflicts: [responseData.message || 'Email or username already exists'] }
					});
				}
				if (response.status === 401) {
					return fail(401, {
						data: { email },
						errors: { credentials: [responseData.message || 'Invalid email or password'] }
					});
				}

				throw error(response.status, responseData.message || 'Failed to log in');
			}
			// returning fail even on success because we want to render the form, IDK WHY
			return fail(200, { data: updateUser, success: true });
		} catch (err) {
			if (err.status && err.location) {
				throw err;
			}
			throw error(500, 'Internal server error');
		}
	}
};
