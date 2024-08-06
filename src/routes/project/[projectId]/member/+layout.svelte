<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { slide, fade, fly } from 'svelte/transition';
	import { spin } from '$lib/transitions/spin';
	import SidebarItem from './SidebarItem.svelte';

	import { cubicIn, cubicOut, cubicInOut } from 'svelte/easing';

	export let data;
	let collapsed;
	let forcefullyCollapsed = false;

	let navbar;
	let main;
	let aside;

	let showBars = false;
	let showTimes = true;

	let activeRoute = $page.url.pathname;
	page.subscribe((value) => {
		activeRoute = value.url.pathname;
	});
	let projectId = $page.params.projectId;

	function handleSidebarResize() {
		if (window.innerWidth < 960) {
			collapsed = true;
		} else {
			collapsed = forcefullyCollapsed;
			//		collapsed = false;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleSidebarResize);
		}

		return () => {
			window.removeEventListener('resize', handleSidebarResize);
		};
	});

	const toggleCollapse = (forcefully = false) => {
		if (typeof window !== 'undefined') {
			if (collapsed && window.innerWidth < 960) {
				return;
			}
			collapsed = !collapsed;
			if (forcefully) {
				forcefullyCollapsed = !forcefullyCollapsed;
			}
		}
	};

	const toggleForceCollapse = () => {
		toggleCollapse(true);
	};
</script>

<div class="flex flex-row h-full">
	<!-- Side Navigation Bar -->
	<nav
		class="{collapsed ? 'w-14 flex-none' : 'w-64'} transition-all duration-[200ms] {collapsed
			? ''
			: 'border-r-2'} border-gray-200 pt-2"
		bind:this={navbar}
	>
		<div class="pl-5 pb-2">
			<button aria-label="Expand sidebar" class="cursor-pointer" on:click={toggleForceCollapse}>
				{#if collapsed && showBars}
					<i
						class="fa fa-bars text-gray-400"
						out:spin={{ direction: 1 }}
						in:spin={{ direction: -1 }}
						on:outroend={() => {
							showBars = false;
							showTimes = true;
						}}
					></i>
				{:else if !collapsed && showTimes}
					<i
						class="fa fa-times text-gray-400"
						out:spin={{ direction: 1 }}
						in:spin={{ direction: -1 }}
						on:outroend={() => {
							showTimes = false;
							showBars = true;
						}}
					></i>
				{/if}
			</button>
		</div>
		<ul class="flex flex-col">
			<SidebarItem
				pathName="dashboard"
				icon="fa-solid fa-table-columns"
				text="Dashboard"
				{collapsed}
			/>
			<SidebarItem pathName="settings" icon="fa-solid fa-cog" text="Settings" {collapsed} />
			<SidebarItem pathName="chat" icon="fa-solid fa-comment" text="Chat" {collapsed} />
		</ul>
	</nav>

	<!-- Main Content Area -->
	<main class="flex-1 h-full min-w-[600px] pb-6" bind:this={main}>
		<slot />
	</main>

	<aside class="w-64 min-w-40 flex flex-col p-4 border-l-2 overflow-y-auto pt-0" bind:this={aside}>
		<ul class="flex flex-col gap-4">
			{#each data?.project?.users as user}
				<li class="flex flex-row items-center">
					<img src={user?.profilePicture} alt={user?.username} class="w-8 h-8 rounded-full mr-2" />
					<a
						href="/profile/{user.userId}"
						class="text-gray-
            600">{user.username}</a
					>
				</li>
			{/each}
		</ul>
	</aside>
</div>
