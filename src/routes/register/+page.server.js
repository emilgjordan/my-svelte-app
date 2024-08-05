import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const registerSchema = z.object({
	firstName: z
		.string({
			required_error: 'First name is required'
		})
		.min(1, {
			message: 'First name is required'
		})
		.max(32, {
			message: 'First name must be less than 32 characters'
		}),
	lastName: z
		.string({
			required_error: 'Last name is required'
		})
		.min(1, {
			message: 'Last name is required'
		})
		.max(32, {
			message: 'Last name must be less than 32 characters'
		}),
	username: z
		.string({
			required_error: 'Username is required'
		})
		.min(1, {
			message: 'Username is required'
		})
		.max(16, {
			message: 'Username must be less than 16 characters'
		}),
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, {
			message: 'Email is required'
		})
		.max(64, {
			message: 'Email must be less than 64 characters'
		})
		.email({ message: 'Invalid email' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, {
			message: 'Password must be at least 8 characters'
		})
		.max(32, {
			message: 'Password must be less than 32 characters'
		})
		.trim()
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			const result = registerSchema.parse(formData);
		} catch (err) {
			const { fieldErrors } = err.flatten();
			const { password, ...rest } = formData;
			return {
				data: rest,
				errors: fieldErrors
			};
		}

		const { password, ...rest } = formData;
		const api_url = 'http://localhost:3000';

		try {
			const response = await fetch(`${api_url}/users`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const responseData = await response.json();

			if (!response.ok) {
				if (response.status === 409) {
					return {
						data: rest,
						errors: { conflicts: [responseData.message || 'Email or username already exists'] }
					};
				}
				console.error('Backend error: ', responseData);
				throw error(response.status, responseData.message || 'Failed to register');
			}

			const { access_token } = responseData;

			if (access_token) {
				cookies.set('token', access_token, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 1000
				});
				throw redirect(302, '/');
			} else {
				throw error(422, 'Failed to register: no token received');
			}
		} catch (err) {
			if (err.status && err.location) {
				throw err;
			}
			console.log('Registration error: ', err);
			throw error(500, 'Internal server error');
		}
	}
};
