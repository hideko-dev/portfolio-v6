<script>
	import "../css/theme.css"
	import { onHydrated } from "../lib/stores/theme.js"
	import { onMount } from "svelte"
	import Header from "../components/header.svelte"
	import Footer from "../components/footer.svelte"
	import PageTransition from "../components/pageTransition.svelte"
	import { Toaster } from "svelte-french-toast";

	onMount(() => onHydrated())
	export let data
</script>

<section>
	<Header/>
	<PageTransition pathname={data.pathname}>
		<slot/>
	</PageTransition>
	<Footer/>
	<Toaster/>
</section>