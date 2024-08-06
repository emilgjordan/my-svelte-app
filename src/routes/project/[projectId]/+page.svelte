<script>
	import { invalidate, invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/dateUtils.js';
	import Chat from './member/chat/Chat.svelte';

	import { fade } from 'svelte/transition';
	import { spin } from '$lib/transitions/spin';

	export let data;
	export let form;

	let userInProject = data?.project?.users.map((user) => user.userId).includes(data?.user?.userId);

	let isLiked = data?.likes?.map((like) => like.user).includes(data?.user?.userId);
	let joinRequestSent = data?.project?.joinRequests
		?.map((joinRequest) => joinRequest.userId)
		.includes(data?.user?.userId);

	$: if (form?.liked) {
		isLiked = true;
	} else if (form?.unliked) {
		isLiked = false;
	}

	let showSentIcon = joinRequestSent;

	$: if (form?.joinRequestSent) {
		joinRequestSent = true;
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
				<form use:enhance method="POST" action={isLiked ? '?/unlike' : '?/like'}>
					<button type="submit" class="focus:outline-none">
						<i class="{isLiked ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart"></i>
					</button>
				</form>
			</div>
			<p class="text-gray-600 my-2">{data?.project.description}</p>
			{#if !userInProject}
				<form use:enhance method="POST" action="?/joinRequest">
					<button
						type="submit"
						disabled={joinRequestSent}
						class="flex flex-row items-center space-x-2 focus:outline-none text-gray-500 hover:text-green-500"
					>
						{#if joinRequestSent && showSentIcon}
							<i class="fa-regular fa-envelope text-green-500" in:spin={{ direction: -1 }}></i>
						{:else if !joinRequestSent}
							<i
								class="fa-regular fa-paper-plane"
								out:spin={{ direction: 1 }}
								on:outroend={() => {
									showSentIcon = true;
								}}
							></i>
						{/if}

						{#if joinRequestSent}
							<span class=" font-semibold text-sm text-green-500">Join Request Sent</span>
						{:else}
							<span class=" font-semibold text-sm">Send Join Request</span>
						{/if}
					</button>
				</form>
			{/if}
		</div>
		{#if userInProject}
			<div class="mb-8">
				<a
					href="/project/{data?.project.projectId}/member/dashboard"
					class=" py-2 text-blue-500 mb-20 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					>Dashboard
					<i class="fa-solid fa-arrow-up-right-from-square ml-2"></i>
				</a>
			</div>
		{/if}

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
