<script lang="ts">
	import { to_binary, from_binary, deputify, putify } from "../logic/putifier";
	import { fly } from 'svelte/transition'
	import '../app.css'

	let normal_text = ''
	let puta_text = ''

	$: valid_puta = /^[PUTAputa ]*$/.test(puta_text)

	let last_focused
	
	let show_explanation = false
	let show_snackbar = false

	function copy(text: string): void {
		navigator.clipboard.writeText(text)
		show_snackbar = true
		setTimeout(() => show_snackbar = false, 2000)
	}

	function handleKeydown(e) {
		if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
			if (last_focused === 'Puta') {
				copy(puta_text)
			} else {
				copy(normal_text)
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<h1> Puta converter </h1>
	<h2> Take your text and putify it! </h2>

	<section>
		<div>
			<textarea 
				bind:value={normal_text} 
				placeholder="Normal text" 
				on:keyup={() => puta_text = putify(to_binary(normal_text))}
				on:change={() => puta_text = putify(to_binary(normal_text))}
				on:focus={() => last_focused = 'Normal'}
				rows=2
			/>	
			<button on:click={() => copy(normal_text)}> Copy </button>
		</div>
		
		<div>
			<textarea 
				id='puta'
				class={valid_puta ? '' : 'invalid'}
				bind:value={puta_text} 
				placeholder="Putified text" 
				on:keyup={() => normal_text = from_binary(deputify(puta_text))}
				on:change={() => normal_text = from_binary(deputify(puta_text))}
				on:focus={() => last_focused = 'Puta'}
			/>
			<button on:click={() => copy(puta_text)}> Copy </button>
		</div>
		
		<button on:click={() => show_explanation = !show_explanation} style='margin: 2em; opacity: 80%'> How even? </button>
	</section>

	{#if show_explanation}
	<section transition:fly={{x: -100, duration: 1000}}>
		<p>
			Text is converted to binary using UTF-8, then "puta" is written repeatedly, were each letter is uppercase or lowercase depending on the binary string obtained from the input text. 
		</p>
		<h2> From normal text </h2>
		<p>
			Binary: {to_binary(normal_text)} <br>
			Putified: {putify(to_binary(normal_text))} <br>
		</p>
		
		<h2> From puta text </h2>
		<p>
			Deputified: {deputify(puta_text)} <br>
			String: {from_binary(deputify(puta_text))} <br>
		</p>

		Source code available at <a href="https://github.com/Odilf/PCnv" target="_blank">GitHub</a> 

		<br>
		<br>

		Semantic satiation into oblivion...


	</section>
	{/if}
</main>

<!-- {#if show_snackbar} -->
	<div id="snackbar-container" class={show_snackbar ? '' : 'hidden'}>
		<div id="snackbar">
			Copied text to clipboard!
		</div>
	</div>
<!-- {/if} -->

<style>
	main { 
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: min(900px, 90vw);
	}

	textarea {
		width: min(80vw, 800px);
		margin: 0.5rem;
		padding: 0.5em;

		background-color: var(--tertiary);
		border: none;
		box-shadow: none;

		border-radius: 15px;

		/* transition: all 0.5s ease; */
		text-align: center;

		transition: background-color 0.5s ease;
	}

	div {
		display: flex;
		align-items: center;
	}

	#puta {
		font-size: 1rem;
		min-height: fit-content;
	}

	#snackbar-container {
		position: sticky;
		bottom: 20px;
		left: 0; right: 0;

		display: flex;
		justify-content: center;

		transition: all 0.5s ease;
	}

	#snackbar {
		display: flex;
		justify-content: center;

		width: min(90vw, 400px);
		height: 3em;

		background-color: rgba(41, 169, 255, 0.247);
		border-radius: 20px;

		backdrop-filter: blur(2px);
	}

	.hidden {
		transform: translateY(100%) rotate(2deg);
		opacity: 0;
	}

	.invalid {
		background-color: rgb(134, 0, 0);
	}
</style>