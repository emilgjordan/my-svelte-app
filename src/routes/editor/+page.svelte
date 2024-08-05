<script>
	import Editor from './Editor.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<Editor formData={form?.data} errors={form?.errors} />
