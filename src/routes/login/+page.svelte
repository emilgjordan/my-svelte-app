<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="h-full flex items-center justify-center">
	<div class="bg-white p-8 rounded-lg w-full max-w-md">
		<h2 class="text-2xl font-bold text-center">Log in</h2>

		<form method="POST" use:enhance>
			<div class="mb-4">
				<label for="email" class="block text-gray-700">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					value={form?.data?.email ?? ''}
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.email
						? 'border-red-500'
						: ''}"
				/>

				<label for="email" class="block text-gray-700">
					{#if form?.errors?.email}
						<span class="text-red-500 text-sm">{form?.errors?.email[0]}</span>
					{/if}
				</label>
			</div>
			<div class="mb-6">
				<label for="password" class="block text-gray-700">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {form
						?.errors?.password
						? 'border-red-500'
						: ''}"
				/>
				<label for="password" class="block text-gray-700">
					{#if form?.errors?.password}
						<span class="text-red-500 text-sm">{form?.errors?.password[0]}</span>
					{/if}
				</label>
			</div>
			{#if form?.errors?.credentials}
				<div class="mb-4 text-center text-red-500">
					{form.errors.credentials[0]}
				</div>
			{/if}
			<button
				type="submit"
				class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
				>Log in</button
			>
		</form>
		<div class="text-center mt-5">
			<a href="/register" class="text-sm text-blue-500">Need an account?</a>
		</div>
	</div>
</div>
