<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="h-full flex items-center justify-center">
	<div class="bg-white p-8 rounded-lg w-full max-w-md">
		<h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
		<form method="POST" use:enhance>
			<div class="mb-4">
				<label for="firstName" class="block text-gray-700">First Name</label>
				<input
					name="firstName"
					type="text"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.email
						? 'border-red-500'
						: ''}"
					value={form?.data?.firstName ?? ''}
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
						?.errors?.email
						? 'border-red-500'
						: ''}"
					value={form?.data?.lastName ?? ''}
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
						?.errors?.email
						? 'border-red-500'
						: ''}"
					value={form?.data?.username ?? ''}
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
					value={form?.data?.email ?? ''}
				/>
				{#if form?.errors?.email}
					<span class="text-red-500 text-sm">{form?.errors?.email[0]}</span>
				{/if}
			</div>
			<div class="mb-6">
				<label for="password" class="block text-gray-700">Password</label>
				<input
					name="password"
					type="password"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.email
						? 'border-red-500'
						: ''}"
				/>
				{#if form?.errors?.password}
					<span class="text-red-500 text-sm">{form?.errors?.password[0]}</span>
				{/if}
			</div>
			{#if form?.errors?.conflicts}
				<div class="mb-4 text-center text-red-500">
					{form.errors.conflicts[0]}
				</div>
			{/if}
			<button
				type="submit"
				class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
				>Register</button
			>
		</form>
		<div class="text-center mt-5">
			<a href="/login" class="text-sm text-blue-500">Have an account?</a>
		</div>
	</div>
</div>
