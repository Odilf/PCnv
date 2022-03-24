const PUTA = 'PUTA'
const puta = 'puta'

export function to_binary(normal_text: string): string {		

	// To binary
	let binary_text = ''
	for (let i = 0; i < normal_text.length; i++) {
		const binary = normal_text.charCodeAt(i).toString(2)
		
		const dif = (binary.length < 8 ? 8 : 16) - binary.length
		binary_text += dif > 0 ? '0'.repeat(dif) : '' + binary 

		binary_text += binary + ' '
	}

	return binary_text
}

export function putify(binary: string): string {
	let puta_text = ''
	binary.split(' ').forEach(number => {
		for (let i = 0; i < number.length; i++) {
			puta_text += (number.charAt(i) === '0' ? puta : PUTA).charAt(i % 4)
		}
		puta_text += ' '

	})
	
	puta_text = puta_text.replace(/^\s+|\s+$/g, '');
	
	return puta_text
}

export function deputify(puta_text: string): string {
	let binary = ''
	for (let i = 0; i < puta_text.length; i++) {
		const char = puta_text.charAt(i)
		if (char == ' ') {
			binary += ' '
		} else {
			binary += char.toUpperCase() === char ? '1' : '0'
		}
	}

	return binary
}

export function from_binary(binary: string): string {
	if (!binary) {
		return ''
	}
	let string = ''
	binary.split(' ').forEach(char => string += String.fromCharCode(parseInt(char, 2)));
	return string;
}