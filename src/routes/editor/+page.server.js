import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const projectEditorSchema = z.object({
	title: z
		.string({ required_error: 'Your project should have a title' })
		.min(1, {
			message: 'Your project should have a title'
		})
		.max(64, {
			message: 'Your title should be less than 64 characters'
		})
		.trim(),
	description: z
		.string({ required_error: 'Your project should have a description' })
		.min(1, {
			message: 'Your project should have a description'
		})
		.trim()
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			const result = projectEditorSchema.parse(formData);
		} catch (err) {
			const { fieldErrors } = err.flatten();
			return {
				data: formData,
				errors: fieldErrors
			};
		}

		const token = cookies.get('token');
		if (!token) {
			return {
				data: formData,
				errors: {
					credentials: ['User must be logged in to create project!']
				}
			};
		}

		const { title, description } = formData;
		const api_url = 'http://localhost:3000';

		try {
			const response = await fetch(`${api_url}/projects`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ title, description })
			});

			const responseData = await response.json();

			if (!response.ok) {
				if (response.status === 401) {
					return {
						data: formData,
						errors: {
							credentials: [responseData.message || 'User must be logged in to create project!']
						}
					};
				}
				throw error(response.status, responseData.message || 'Failed to create project');
			}
			throw redirect(302, '/');
		} catch (err) {
			if (err.status && err.location) {
				throw err;
			}
			console.log('Project Creation Error: ', err);
			throw error(500, 'Internal server error!!');
		}
	}
};
