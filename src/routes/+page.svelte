<script>
	export let data;
</script>

<svelte:head>
	<title>Buildia</title>
</svelte:head>

{#if !data.user}
	<div class="bg-blue-500 text-white py-20 text-center">
		<h1 class="text-5xl font-bold mb-10">Buildia</h1>
		<p class="text-xl">Where ideas turn into reality.</p>
	</div>
{/if}

<div class="m-10">
	<h2 class="text-2xl font-semibold mb-5">Projects</h2>
	<div class="flex flex-col gap-4 grid-cols-1 p-4 border-l-2">
		{#each data.projects as project}
			<div class="bg-white shadow p-4 rounded block">
				<a class="block text-xl font-semibold" href="/project/{project.projectId}"
					>{project.title}</a
				>
				<a class="text-gray-500 text-sm" href="/profile/{project.creator.userId}"
					>@{project.creator.username}</a
				>
				<p>{project.description}</p>
			</div>
		{/each}
	</div>
</div>
