import jwt from 'jsonwebtoken';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token) {
		try {
			const user = jwt.verify(token, 'secret');
			if (typeof user === 'string') {
				throw new Error('Something went wrong');
			}
			event.locals.user = { userId: user?.sub as string, email: user?.email as string }; // Store user information in locals
		} catch (err) {
			event.cookies.delete('token', { path: '/' });
		}
	}

	const response = await resolve(event);
	return response;
};
