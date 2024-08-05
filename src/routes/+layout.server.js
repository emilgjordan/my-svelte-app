import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	let userData;
	if (locals.user) {
		try {
			const response = await fetch(
				`http://localhost:3000/users/${locals.user.userId}?populate=true`
			);
			userData = await response.json();
		} catch (err) {
			console.error(err);
			throw error(500, 'Failed to load user data');
		}
	}
	return {
		user: userData
	};
}
