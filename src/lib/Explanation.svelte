<script lang="ts">
	import { to_binary, from_binary, deputify, putify } from "$lib/logic/putifier"
	import { fly } from 'svelte/transition'

	export let normal_text: string
	export let puta_text: string

	let show_explanation = false
</script>

<main class='flex flex-col items-center dark:text-white'>
<button on:click={() => show_explanation = !show_explanation} class='m-2 opacity-70 clickable font-bold text-lg'> How even? </button>

{#if show_explanation}	

	<section transition:fly={{x: -100, duration: 1000}} class='mx-4 text-justify'>
		<p>
			Text is converted to binary using UTF-8, then "puta" is written repeatedly, were each letter is uppercase or lowercase depending on the binary string obtained from the input text. 
		</p>
		<br>
		<br>

		<h2 class='font-semibold text-lg'> From normal text </h2>
		<p>
			Binary: {to_binary(normal_text)} <br>
			Putified: {putify(to_binary(normal_text))} <br>
		</p>
		
		<br>

		<h2 class='font-semibold text-lg'> From puta text </h2>
		<p>
			Deputified: {deputify(puta_text)} <br>
			String: {from_binary(deputify(puta_text))} <br>
		</p>

		<br>

		Source code available at <a href="https://github.com/Odilf/PCnv" target="_blank">GitHub</a> 

		<br>
		<br>

		<p class='font-light opacity-50'>
			Semantic satiation into oblivion...
		</p>


	</section>

{/if}
</main>