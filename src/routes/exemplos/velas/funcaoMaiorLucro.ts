export function funcaoMaiorLucro({ matriz }: { matriz: number[][] }) {
	let maiorLucro = -Infinity;
	let melhorCurta;
	let melhorLonga;

	for (let curta = 1; curta <= matriz.length - 1; curta++) {
		for (let longa = curta + 1; longa <= matriz.length - 1; longa++) {
			if (matriz[curta][longa] > maiorLucro) {
				maiorLucro = matriz[curta][longa];
				melhorCurta = curta;
				melhorLonga = longa;
			}
		}
	}
	return {
		maiorLucro,
		melhorCurta,
		melhorLonga,
	};
}
