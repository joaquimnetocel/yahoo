export function funcaoMaioresLucros({
	matriz,
	quantidade = 10,
}: {
	matriz: (number | null)[][];
	quantidade?: number;
}) {
	const resultados: {
		lucro: number;
		melhorCurta: number;
		melhorLonga: number;
	}[] = [];

	for (let curta = 1; curta < matriz.length; curta++) {
		for (let longa = curta + 1; longa < matriz.length; longa++) {
			const lucro = matriz[curta][longa];

			if (lucro !== null) {
				resultados.push({
					lucro,
					melhorCurta: curta,
					melhorLonga: longa,
				});
			}
		}
	}

	return resultados.sort((a, b) => b.lucro - a.lucro).slice(0, quantidade);
}
