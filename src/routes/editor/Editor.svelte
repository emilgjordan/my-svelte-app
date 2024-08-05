<script>
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { enhance } from '$app/forms';

	export let project;
	export let formData;
	export let errors;
</script>

<div class="min-h-screen flex items-center justify-center bg-white">
	<div class=" w-full max-w-md">
		<h2 class="text-2xl font-bold mb-6 text-center">New Project</h2>
		<form use:enhance id="editor" method="POST">
			<div class="mb-4">
				<input
					name="title"
					class="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {errors?.title
						? 'border-red-500'
						: ''}"
					placeholder="Project Title"
					value={formData?.title ?? project?.title ?? ''}
				/>
				<label for="title" class="block text-gray-700">
					{#if errors?.title}
						<span class="text-red-500 text-sm">{errors?.title[0]}</span>
					{/if}
				</label>
			</div>

			<div class="mb-4">
				<textarea
					name="description"
					id="description"
					form="editor"
					class="text-wrap text-start h-20 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 {errors?.description
						? 'border-red-500'
						: ''}"
					placeholder="What's this project about?"
					value={formData?.description ?? project?.description ?? ''}
				/>
				<label for="description" class="block text-gray-700">
					{#if errors?.description}
						<span class="text-red-500 text-sm">{errors?.description[0]}</span>
					{/if}
				</label>
			</div>

			{#if errors?.credentials}
				<div class="mb-4 text-center text-red-500">
					{errors.credentials[0]}
				</div>
			{/if}

			<button
				class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
				>{project ? 'Save Changes' : 'Publish Project'}</button
			>
		</form>
	</div>
</div>
