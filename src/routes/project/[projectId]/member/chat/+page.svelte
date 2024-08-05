<script>
	export let data;
	import Chat from './Chat.svelte';
</script>

{#if data}
	<Chat jwtToken={data?.jwtToken} />
{/if}

<!-- Your HTML code here 
  {#if (data?.messages && data?.project.users
		.map((user) => user.userId)
		.includes(data?.user.userId)) || true}
	<Chat jwtToken={data?.jwtToken} />
{/if}
-->
