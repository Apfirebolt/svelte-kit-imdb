<script lang="ts">
	import '../app.css';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { onMount } from 'svelte';
	import FooterComponent from '$lib/components/Footer.svelte';

	let { children } = $props();

	onMount(() => {
	  AOS.init({
		// You can also include settings here
		once: true, // whether animation should happen only once - while scrolling down
	  });
	});
</script>

{@render children()}

<FooterComponent />