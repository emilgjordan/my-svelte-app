export async function load({ params }) {
	let userData;
	try {
		const response = await fetch(`http://localhost:3000/users/${params.userId}?populate=true`);
		userData = await response.json();
		return {
			profileUser: userData
		};
	} catch (err) {
		console.error(err);
		throw error(500, 'Failed to load user data');
	}
}
