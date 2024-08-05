<script>
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { tweened } from 'svelte/motion';
	let activeRoute = $page.url.pathname;

	$: activeRoute = $page.url.pathname;

	export let pathName;
	export let icon;
	export let text;
	export let collapsed;
</script>

<li
	class="h-12 flex flex-row items-center transition-all {activeRoute ===
	`/project/${$page.params.projectId}/member/${pathName}`
		? ''
		: '-translate-x-1'} "
>
	<div
		transition:fly={{ x: -4, opacity: 1, duration: 200 }}
		class="w-1 h-3/4 bg-blue-500 rounded-r flex-shrink-0"
	></div>

	<a href="/project/{$page.params.projectId}/member/{pathName}" class="flex-shrink-0 pl-4">
		<i class="{icon} p-1 text-sm text-gray-400"></i>
	</a>
	{#if !collapsed}
		<a
			href="/project/{$page.params.projectId}/member/{pathName}"
			class="py-2 flex flex-row items-center flex-shrink"
		>
			<span class="ml-2 pb-0.5" transition:fade={{ duration: 150 }}>{text}</span>
		</a>
	{/if}
</li>
