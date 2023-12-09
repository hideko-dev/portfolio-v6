<script>
	import "../css/theme.css"
	import { theme, onHydrated } from "../lib/stores/theme.js"
	import { onMount } from "svelte"
	import Header from "../components/header.svelte"
	onMount(() => onHydrated())
</script>

<section class={`${$theme ? 'theme-dark' : 'theme-light'}`}>
	<Header/>
	<slot/>
</section>