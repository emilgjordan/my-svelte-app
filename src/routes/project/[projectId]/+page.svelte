<script>
	export let data;
	import { formatDate } from '$lib/dateUtils.js';
	import Chat from './member/chat/Chat.svelte';

	let likeUserIds = data?.likes?.map((like) => like.user);
	let isLiked = likeUserIds.includes(data?.user?.userId);

	function toggleLike() {
		isLiked = !isLiked;
	}

	function handleToggleLike(event) {
		if (isLiked) {
			handleUnlike(event);
		} else {
			handleLike(event);
		}
	}
	async function handleUnlike(event) {
		if (!data?.user) {
			return;
		}
	}
	async function handleLike(event) {
		if (!data?.user) {
			return;
		}
		if (!data?.jwtToken) {
			console.log('No jwtToken');
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:3000/projects/${data?.project?.projectId}/likes`,
				{
					method: 'POST',

					body: JSON.stringify({ projectId: data?.project?.projectId }),

					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${data?.jwtToken}`
					}
				}
			);
			const result = await response.json();
			if (response.ok) {
				isLiked = !isLiked;
			} else {
				console.error(result);
			}
		} catch (error) {
			console.error('Error liking the post:', error);
		}

		// fetch('/project/[projectId]', {
		// 	method: 'POST',
		// 	body: { userId: data?.user?.userId, projectId: data?.project?.projectId }
		// })
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		if (result.success) {
		// 			isLiked = !isLiked;
		// 		} else {
		// 			console.error(result.message);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error liking the post:', error);
		// 	});
	}
</script>

<svelte:head>
	<title>Buildia - {data?.project.title}</title>
</svelte:head>

<div class="bg-white h-full p-10">
	<div class="max-w-4xl mx-auto">
		<div class="mb-6">
			<div class="mb-2 flex flex-row items-center space-x-4">
				<h1 class="pb-1 text-3xl font-bold">{data?.project.title}</h1>
				<p class=" text-gray-600 text-sm">{formatDate(data?.project.createdAt)}</p>
				<form on:submit|preventDefault={handleToggleLike}>
					<button type="submit" class="focus:outline-none">
						<i class="{isLiked ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart"></i>
					</button>
				</form>
			</div>
			<p class="text-gray-600 mt-2">{data?.project.description}</p>
		</div>
		<div class="mb-8">
			{#if data?.project.users.map((user) => user.userId).includes(data?.user?.userId)}
				<a
					href="/project/{data?.project.projectId}/member/dashboard"
					class=" py-2 text-blue-500 mb-20 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					>Dashboard
					<i class="fa-solid fa-share-from-square ml-2"></i>
				</a>
			{/if}
		</div>

		<div class="flex items-center space-x-4 mb-6">
			<div>
				<h2 class="text font-semibold mb-4">Created By</h2>
				<a href="/profile/{data?.project?.creator.userId}" class="flex items-center space-x-2">
					<img
						src={data?.project?.creator.profilePicture}
						alt={data?.project?.creator.username}
						class="w-8 h-8 rounded-full mr-2"
					/>
					<span class="text-gray-600">{data?.project?.creator.username}</span>
				</a>

				<h1 class="mt-2 font-semibold">
					{data?.project?.creator.firstName}
					{data?.project?.creator.lastName}
				</h1>
				<p class="text-gray-600 text-sm">{data?.project?.creator?.email}</p>
			</div>
		</div>
		<div>
			<h2 class="text-xl font-semibold">Users</h2>
			<div class="flex flex-col gap-4 mt-4 pl-4 border-l-2">
				{#each data?.project.users as user}
					<a href="/profile/{user.userId}" class="flex items-center space-x-2">
						<img
							src={user?.profilePicture}
							alt={user?.username}
							class="w-8 h-8 rounded-full mr-2"
						/>
						<span class="text-gray-600">{user.username}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
