<script>
	import '../app.css';
	import Nav from './Nav.svelte';
	export let data;
	$: user = data?.user;

	let navHeight = 64;
</script>

<div class="flex flex-col max-h-screen">
	<Nav {user} {navHeight} />

	<main class="overflow-y-auto" style="height: calc(100vh - {navHeight}px);">
		<slot />
	</main>
</div>
