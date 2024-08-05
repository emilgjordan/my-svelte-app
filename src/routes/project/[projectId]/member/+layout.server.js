export async function load({ cookies, params }) {
	const token = cookies.get('token');
	let messagesData;

	try {
		const response = await fetch(
			`http://localhost:3000/projects/${params.projectId}/messages?populate=true`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);

		messagesData = await response.json();
	} catch (err) {
		console.error(err);
	}

	return { messages: messagesData, jwtToken: token };
}
