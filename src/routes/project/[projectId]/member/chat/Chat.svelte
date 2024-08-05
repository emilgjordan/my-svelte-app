<script>
	import { page } from '$app/stores';
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { io } from 'socket.io-client';
	export let jwtToken;
	let socket;
	let newMessages = [];
	let chatContainer;

	function sendMessage(event) {
		event.preventDefault();
		if (!socket) {
			console.log('Cant send message, socket not connected');
			return;
		}
		socket.emit('message:send', {
			projectId: $page.params.projectId,
			content: event.target.elements[0].value
		});
		event.target.reset();
	}

	function scrollToBottom() {
		if (!chatContainer) {
			return;
		}
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	onMount(() => {
		//	console.log('Chat component mounted');
		if (!jwtToken) {
			return;
		}
		socket = io('http://localhost:3000', {
			auth: {
				token: `Bearer ${jwtToken}`
			}
		});
		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});
		socket.on('message:new', (data) => {
			newMessages = [...newMessages, data];
		});
		socket.on('disconnect', () => {
			console.log('Disconnected from WebSocket server');
		});
		socket.emit('room:join', $page.params.projectId);
		scrollToBottom();
		return () => {
			socket.emit('room:leave', $page.params.projectId);
			socket.disconnect();
		};
	});

	onDestroy(() => {
		console.log('Chat component destroyed');
	});

	//	scrollToBottom();

	afterUpdate(() => {
		scrollToBottom();
	});
</script>

{#if $page?.data?.messages}
	<div class="flex flex-1 flex-col h-full rounded-lg border shadow p-4 pt-0 mx-6">
		<div class="flex-1 overflow-y-auto" id="chat-container" bind:this={chatContainer}>
			{#each [...$page?.data?.messages, ...newMessages] as message, index}
				{#if index === 0 || (message.user?.username ?? message.username) !== ([...$page?.data?.messages, ...newMessages][index - 1].user?.username ?? [...$page?.data?.messages, ...newMessages][index - 1].username) || new Date(message.timestamp) - new Date([...$page?.data?.messages, ...newMessages][index - 1].timestamp) > 120000}
					<div class="mt-4">
						<div class="flex items-center mb-2">
							<img
								src={message.user?.profilePicture}
								alt={message.user?.username ?? message.username}
								class="w-8 h-8 rounded-full mr-2"
							/>
							<div>
								<p class="font-semibold">{message.user?.username ?? message.username}</p>
								<p class="text-xs text-gray-500">
									{#if new Date(message.timestamp).toDateString() === new Date().toDateString()}
										{new Date(message.timestamp).toLocaleTimeString([], {
											hour: 'numeric',
											minute: 'numeric',
											hour12: true
										})}
									{:else}
										{new Date(message.timestamp).toLocaleDateString([], {
											year: '2-digit',
											month: 'numeric',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
											hour12: true
										})}
									{/if}
								</p>
							</div>
						</div>
						<div
							class="bg-white p-1 {index === [...$page?.data?.messages, ...newMessages].length - 1
								? 'mb-4'
								: ''}"
						>
							<p>{message.content}</p>
						</div>
					</div>
				{:else}
					<div
						class="bg-white p-1 {index === [...$page?.data?.messages, ...newMessages].length - 1
							? 'mb-4'
							: ''}"
					>
						<p>{message.content}</p>
					</div>
				{/if}
			{/each}
		</div>
		<div class=" bg-white">
			<form class="flex" on:submit={sendMessage}>
				<input
					type="text"
					placeholder="Type your message..."
					class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
				/>
			</form>
		</div>
	</div>
{/if}
