export async function load({ locals }) {
	let projectData;
	let userData;
	try {
		const response = await fetch('http://localhost:3000/projects?populate=true');
		projectData = await response.json();
	} catch (err) {
		console.error(err);
	}

	return { projects: projectData };
}
