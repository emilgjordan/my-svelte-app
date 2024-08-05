<script>
	export let data;
</script>

<svelte:head>
	<title>Buildia - {data?.profileUser.username}</title>
</svelte:head>

<div class=" min-h-screen p-5">
	<div class="max-w-4xl mx-auto bg-white border shadow rounded-lg p-6">
		<div class="">
			<div class="flex items-center space-x-2">
				<img
					src={data?.profileUser?.profilePicture}
					alt={data?.profileUser?.username}
					class="w-8 h-8 rounded-full mr-2 inline-block"
				/>
				<span class="text-xl">{data?.profileUser.username}</span>
			</div>

			<h1 class="mt-4 font-semibold">
				{data?.profileUser.firstName}
				{data?.profileUser.lastName}
			</h1>
			<p class="text-gray-600 text-sm">{data?.profileUser.email}</p>
		</div>
		<div class="mt-4">
			<p class="text-gray-700">{data?.profileUser.bio}</p>
		</div>
		<div class="mt-6">
			<h2 class="text font-semibold">Projects</h2>
			<div class="flex flex-col gap-4 mt-4 border-l-2 p-4">
				{#each data?.profileUser.projects as project}
					<div class="">
						<a href="/project/{project.projectId}" class=" font-semibold">{project.title}</a>
						<p class="text-gray-600">{project.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
