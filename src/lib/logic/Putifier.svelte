<script lang="ts">
	import { to_binary, from_binary, deputify, putify } from "$lib/logic/putifier"
	export let normal_text = ''
	export let puta_text = ''

	let last_focused: 'Puta' | 'Normal'
	let show_snackbar = false
	
	$: valid_puta = /^[PUTAputa ]*$/.test(puta_text)
	
	function handleKeydown(e) {
		if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
			if (last_focused === 'Puta') {
				copy(puta_text)
			} else {
				copy(normal_text)
			}
		}
	}

	function copy(text: string): void {
		navigator.clipboard.writeText(text).then(() => {
			show_snackbar = true
			setTimeout(() => show_snackbar = false, 2000)
		})
		
	}

	function update_puta_text() {
		puta_text = putify(to_binary(normal_text))
		if ((puta_text) === ' ') {
			puta_text = ''
		}
	}

	function update_normal_text() {
		normal_text = from_binary(deputify(puta_text))
	}

	function update_last_focused() {
		last_focused === 'Puta' ? update_normal_text() : update_last_focused()
	}
</script>

<svelte:window on:keydown={handleKeydown} on:pointerup={() => update_last_focused()}/>

<textarea
	class='rounded p-2 m-1 bg-white/80 dark:bg-white transition shadow'
	bind:value={normal_text} 
	placeholder="Normal text" 
	on:keyup={() => update_puta_text()}
	on:change={() => update_puta_text()}
	on:touchend={() => update_puta_text()}
	on:focus={() => last_focused = 'Normal'}
	rows=2
/>
<div class='mb-8'>
	<button class='clickable' on:click={() => {normal_text = ''; update_puta_text()}}> Delete </button>
	<button class='clickable' on:click={() => copy(normal_text)}> Copy </button>
</div>

<textarea 
	id='puta'
	class:invalid={!valid_puta}
	class='rounded p-2 m-1 bg-white/80 dark:bg-white transition shadow'
	bind:value={puta_text} 
	placeholder="Putified text" 
	on:keyup={() => update_normal_text()}
	on:change={() => update_normal_text()}
	on:focus={() => last_focused = 'Puta'}
	rows=5
/>
<div class='mb-8'>
	<button class='clickable' on:click={() => {puta_text = ''; update_normal_text()}}> Delete </button>
	<button class='clickable' on:click={() => copy(puta_text)}> Copy </button>
</div>

<div class='fixed bottom-4 inset-x-0 text-center transition duration-300 dark:text-white' class:hide={!show_snackbar}>
	Copied text to clipboard!
</div>

<style lang='postcss'>
	.invalid {
		@apply bg-red-500;
	}

	button {
		@apply p-2 m-2 bg-white rounded shadow-sm;
	}

	.hide {
		@apply duration-1000 translate-y-full opacity-0 rotate-2;
	}
</style>