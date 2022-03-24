<script lang="ts">
	import Explanation from '$lib/Explanation.svelte'
	import Putifier from '$lib/logic/Putifier.svelte'

	let normal_text: string
	let puta_text: string	
</script>

<main class='flex flex-col max-w-2xl mx-auto py-10 justify-center min-h-screen'>
	<h1 class='text-6xl font-black text-center m-2 dark:text-white'> Puta converter </h1>
	<h2 class='text-2xl sm:text-3xl font-light text-center mb-4 dark:text-white'> Take your text and putify it! </h2>

	<Putifier bind:normal_text bind:puta_text />
	
	<Explanation {normal_text} {puta_text}/>
</main>