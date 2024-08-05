export async function load({ params }) {
	let projectData;
	try {
		const response = await fetch(
			`http://localhost:3000/projects/${params.projectId}?populate=true`
		);
		projectData = await response.json();
	} catch (err) {
		console.error(err);
	}

	return { project: projectData };
}
