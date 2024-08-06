<script>
	export let data;
</script>

<div class="h-full pb-4 px-8">
	<h1 class="text-2xl font-semibold mb-4">{data?.project?.title}</h1>
	<h2 class="mb-3 text-gray-500">Join Requests</h2>
	<ul class="flex flex-col space-y-6 pl-4 border-l-2">
		{#each data?.project?.joinRequests as joinRequest}
			<li class="flex flex-row items-center">
				<img
					src={joinRequest?.profilePicture}
					alt={joinRequest?.username}
					class="w-8 h-8 rounded-full mr-2"
				/>
				<a
					href="/profile/{joinRequest.userId}"
					class="text-gray-
            600">{joinRequest.username}</a
				>
				<button class="ml-auto py-1 px-2 focus:outline-none text-gray-500"> Accept </button>
			</li>
		{/each}
	</ul>
</div>
