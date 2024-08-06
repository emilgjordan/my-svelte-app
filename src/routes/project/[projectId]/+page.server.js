import { error, fail, redirect } from '@sveltejs/kit';

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
	joinRequest: async ({ locals, params, cookies }) => {
		console.log('sending join request...');
		if (!locals?.user?.userId) {
			throw error(401, 'User must be logged in to send join request!');
		}
		const token = cookies.get('token');
		if (!token) {
			throw error(500, 'No jwtToken found');
		}

		try {
			const response = await fetch(
				`http://localhost:3000/projects/${params.projectId}/join-request`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			);
			const responseData = await response.json();

			if (!response.ok) {
				throw error(response.status, responseData.message || 'Failed to send join request');
			}

			return fail(200, { success: true, joinRequestSent: true });
		} catch (err) {
			console.error(err);
			throw error(500, 'Failed to send join request');
		}
	},
	like: async ({ locals, params, cookies }) => {
		if (!locals?.user?.userId) {
			console.log('User must be logged in to like the post!');
			return;
		}
		const token = cookies.get('token');
		if (!token) {
			console.log('No jwtToken');
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/projects/${params?.projectId}/likes`, {
				method: 'POST',

				body: JSON.stringify({ projectId: params?.projectId }),

				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			});
			const result = await response.json();
			if (!response.ok) {
				throw error(response.status, responseData.message || 'Failed to like project');
			}
			return fail(200, { success: true, liked: true });
		} catch (err) {
			console.log(err);
			throw error(500, 'Error liking the project');
		}
	},
	unlike: async ({ request, cookies, params, locals }) => {
		if (!locals?.user?.userId) {
			throw error(401, 'User must be logged in to unlike the post!');
		}
		const token = cookies.get('token');
		if (!token) {
			throw error(500, 'jwt token not found');
		}

		///

		let likesData;

		try {
			const response = await fetch(`http://localhost:3000/projects/${params.projectId}/likes`);
			likesData = await response.json();
		} catch (err) {
			console.error(err);
			throw error(500, 'Failed to load likes data');
		}

		const like = likesData.find((like) => like.user === locals.user.userId);

		if (!like) {
			throw error(404, 'Like not found');
		}

		///

		try {
			const response = await fetch(
				`http://localhost:3000/projects/${params?.projectId}/likes/${like.likeId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			);
			const result = await response.json();
			if (!response.ok) {
				throw error(response.status, responseData.message || 'Failed to like project');
			}
			return fail(200, { success: true, unliked: true });
		} catch (err) {
			console.log(err);
			throw error(500, 'Error liking the project');
		}
	}
};
