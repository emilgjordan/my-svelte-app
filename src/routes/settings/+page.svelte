<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { te } from 'date-fns/locale';
	export let form;
	export let data;

	let firstName = form?.data?.firstName ?? data?.user?.firstName ?? '';
	let lastName = form?.data?.lastName ?? data?.user?.lastName ?? '';
	let username = form?.data?.username ?? data?.user?.username ?? '';
	let email = form?.data?.email ?? data?.user?.email ?? '';
	let bio = form?.data?.bio ?? data?.user?.bio ?? '';
	let password = '';
	let confirmPassword = '';

	let maxBioLength = 200;
	$: bioLength = bio.length;

	let textarea;
	let minBioHeight = 0;

	function handleBioInput(event) {
		if (bioLength >= maxBioLength) {
			event.preventDefault();
			bio = bio.slice(0, maxBioLength);
		}
		adjustTextareaHeight();
	}

	function adjustTextareaHeight() {
		//	const newHeight = `${textarea.scrollHeight}px`;
		//textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
		// console.log('height: ', textarea?.style?.height);
		// console.log('minHeight: ', textarea?.style?.minHeight);
		// console.log('scrollheight: ', textarea?.scrollHeight);
		// let oldHeight = textarea.style.height;
		textarea.style.height = 'auto'; // Reset the height
		textarea.style.height = `${textarea.scrollHeight}px`; // Set
		// //	textarea.style.height = oldHeight;
		// textarea = textarea;
	}

	$: isFormChanged =
		firstName !== data?.user?.firstName ||
		lastName !== data?.user?.lastName ||
		username !== data?.user?.username ||
		email !== data?.user?.email ||
		bio !== data?.user?.bio ||
		password !== '' ||
		confirmPassword !== '';

	onMount(() => {
		adjustTextareaHeight();
	});
</script>

<div class="min-h-screen flex items-center justify-center bg-white">
	<div class="w-full max-w-md mb-24">
		<h2 class="text-2xl font-bold mb-6 text-center">Your Settings</h2>
		<form
			method="POST"
			action="?/save"
			id="settings"
			use:enhance={() => {
				return async ({ update, result }) => {
					invalidateAll();
					update();
				};
			}}
		>
			<div class="mb-4">
				<label for="firstName" class="block text-gray-700">First Name</label>
				<input
					name="firstName"
					type="text"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.firstName
						? 'border-red-500'
						: ''}"
					bind:value={firstName}
				/>
				{#if form?.errors?.firstName}
					<span class="text-red-500 text-sm">{form?.errors?.firstName[0]}</span>
				{/if}
			</div>
			<div class="mb-4">
				<label for="lastName" class="block text-gray-700">Last Name</label>
				<input
					name="lastName"
					type="text"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.lastName
						? 'border-red-500'
						: ''}"
					bind:value={lastName}
				/>
				{#if form?.errors?.lastName}
					<span class="text-red-500 text-sm">{form?.errors?.lastName[0]}</span>
				{/if}
			</div>
			<div class="mb-4">
				<label for="username" class="block text-gray-700">Username</label>
				<input
					name="username"
					type="text"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.username
						? 'border-red-500'
						: ''}"
					bind:value={username}
				/>
				{#if form?.errors?.username}
					<span class="text-red-500 text-sm">{form?.errors?.username[0]}</span>
				{/if}
			</div>
			<div class="mb-4">
				<label for="email" class="block text-gray-700">Email</label>
				<input
					name="email"
					type="email"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.email
						? 'border-red-500'
						: ''}"
					bind:value={email}
				/>
				{#if form?.errors?.email}
					<span class="text-red-500 text-sm">{form?.errors?.email[0]}</span>
				{/if}
			</div>
			<div class="mb-4">
				<label for="email" class="block text-gray-700">Bio</label>

				<textarea
					name="bio"
					id="bio"
					form="settings"
					spellcheck="false"
					class="overflow-hidden resize-none mt-1 min-h-36 text-wrap text-start block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.bio
						? 'border-red-500'
						: ''}"
					placeholder="Short bio about you..."
					bind:this={textarea}
					bind:value={bio}
					on:input={handleBioInput}
				/>
				<div class="text-sm text-gray-500">
					{bioLength}/{maxBioLength} characters
				</div>

				<label for="description" class="block text-gray-700">
					{#if form?.errors?.bio}
						<span class="text-red-500 text-sm">{form?.errors?.bio[0]}</span>
					{/if}
				</label>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-gray-700">New Password</label>
				<input
					name="password"
					type="password"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.password
						? 'border-red-500'
						: ''}"
					bind:value={password}
				/>
				{#if form?.errors?.password}
					<span class="text-red-500 text-sm">{form?.errors?.password[0]}</span>
				{/if}
			</div>
			<div class="mb-4">
				<label for="confirmPassword" class="block text-gray-700">Confirm password</label>
				<input
					name="confirmPassword"
					type="password"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.confirmPassword
						? 'border-red-500'
						: ''}"
					bind:value={confirmPassword}
				/>
				{#if form?.errors?.confirmPassword}
					<span class="text-red-500 text-sm">{form?.errors?.confirmPassword[0]}</span>
				{/if}
			</div>
			{#if form?.errors?.conflicts}
				<div class="mb-4 text-center text-red-500">
					{form.errors.conflicts[0]}
				</div>
			{/if}
			{#if form?.errors?.credentials}
				<div class="mb-4 text-center text-red-500">
					{form.errors.credentials[0]}
				</div>
			{/if}
			<button
				type="submit"
				class="w-full text-white py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 {isFormChanged
					? 'bg-blue-600 hover:bg-blue-400'
					: 'bg-gray-400'}"
				disabled={!isFormChanged}>Update</button
			>
			{#if form?.success}
				<div class="mt-4 text-center text-green-500">Update successful!</div>
			{/if}
		</form>
		<hr class="my-5 border" />
		<form use:enhance method="POST" action="?/logout">
			<button
				class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-300"
				>Logout</button
			>
		</form>
	</div>
</div>
