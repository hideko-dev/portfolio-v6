<script>
	import "../css/theme.css"
	import { onHydrated } from "../lib/stores/theme.js"
	import { onMount } from "svelte"
	import Header from "../components/header.svelte"
	import Footer from "../components/footer.svelte"
	onMount(() => onHydrated())
</script>

<section>
	<Header/>
	<slot/>
	<Footer/>
</section>