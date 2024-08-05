export async function load({ locals, params, cookies }) {
	const token = cookies.get('token');
	let likesData;
	try {
		const response = await fetch(`http://localhost:3000/projects/${params.projectId}/likes`);
		likesData = await response.json();
	} catch (err) {
		console.error(err);
		throw error(500, 'Failed to load likes data');
	}

	return { jwtToken: token, likes: likesData };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const projectId = data.get('projectId');
		const token = cookies.get('token');

		console.log('in action');

		// if (!token) {
		// 	return { success: false, message: 'User must be logged in to like the post!' };
		// }

		// try {
		// 	const response = await fetch('http://localhost:3000/likes', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${token}`
		// 		},
		// 		body: JSON.stringify({ projectId })
		// 	});

		// 	if (!response.ok) {
		// 		const responseData = await response.json();
		// 		return { success: false, message: responseData.message || 'Failed to like the post' };
		// 	}

		// 	return { success: true };
		// } catch (error) {
		// 	return { success: false, message: 'Error liking the post: ' + error.message };
		// }
	}
};
