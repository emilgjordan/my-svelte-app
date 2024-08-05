<script>
	import { page } from '$app/stores';
	export let user;
	export let navHeight;
</script>

<nav class="flex-none flex justify-between items-center p-4" style="height: {navHeight}px;">
	<a class="text-lg font-semibold text-blue-500" href="/">
		<i class="fa-solid fa-home text-xl"></i>
	</a>
	<ul class="flex gap-6">
		{#if user}
			<li>
				<a
					class="hover:text-gray-500"
					href="/editor"
					class:active={$page.url.pathname === '/editor'}
				>
					<i class="fa-solid fa-plus text-xl text-gray-400"></i>
				</a>
			</li>

			<li>
				<a
					href="/settings"
					class="hover:text-gray-500"
					class:active={$page.url.pathname === '/settings'}
				>
					<i class="fa-solid fa-gear text-xl text-gray-400"></i>
				</a>
			</li>

			<li class="">
				<a href="/profile/{user.userId}" class="hover:text-gray-500">
					<i class="fa-solid fa-user text-xl text-gray-400"></i>
				</a>
			</li>
		{:else}
			<li class="">
				<a href="/login" class="hover:text-gray-500" class:active={$page.url.pathname === '/login'}>
					Log in
				</a>
			</li>

			<li class="nav-item">
				<a
					href="/register"
					class="text-blue-500 border-blue-500 border px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition-all"
					class:active={$page.url.pathname === '/register'}
				>
					Sign up
				</a>
			</li>
		{/if}
	</ul>
</nav>
