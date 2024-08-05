import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const logInSchema = z.object({
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
			const result = logInSchema.parse(formData);
		} catch (err) {
			const { fieldErrors } = err.flatten();
			const { email } = formData;
			return {
				data: { email },
				errors: fieldErrors
			};
		}

		const { email, password } = formData;
		const api_url = 'http://localhost:3000';

		try {
			const response = await fetch(`${api_url}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const responseData = await response.json();

			if (!response.ok) {
				if (response.status === 401) {
					return {
						data: { email },
						errors: { credentials: [responseData.message || 'Invalid email or password'] }
					};
				}
				throw error(response.status, responseData.message || 'Failed to log in');
			}

			const { access_token } = responseData;

			if (access_token) {
				cookies.set('token', access_token, {
					path: '/',
					httpOnly: true,
					//		sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 1000
				});
				throw redirect(302, '/');
			} else {
				throw error(422, 'Failed to log in: no token received');
			}
		} catch (err) {
			if (err.status && err.location) {
				throw err;
			}
			console.log('Login error: ', err);
			throw error(500, 'Internal server error');
		}
	}
};
