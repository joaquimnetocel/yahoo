import type { tipoHeatmapDoApexcharts } from '$lib/apexcharts/tipos/tipoHeatmapDoApexcharts';

export function funcaoMatrizParaHeatmapDoApexcharts({
	matriz,
	inicioPeriodo = 10,
	step = 2,
	maxPeriodo = 100,
}: {
	matriz: number[][];
	inicioPeriodo?: number;
	step?: number;
	maxPeriodo?: number;
}): tipoHeatmapDoApexcharts[] {
	const seriesDoApex = [];

	// 1. Percorre todos os períodos curtos possíveis dentro do step
	for (let curta = inicioPeriodo; curta <= maxPeriodo; curta += step) {
		const dadosDaSerie = [];

		// 2. Percorre TODOS os períodos longos possíveis dentro do step (Grid regular)
		for (let longa = inicioPeriodo; longa <= maxPeriodo; longa += step) {
			if (longa > curta) {
				// Posição válida calculada
				const valor = matriz[curta]?.[longa];
				dadosDaSerie.push({
					x: `L${longa}`,
					y: valor,
				});
			} else {
				// Posição que não entra no cálculo (longa <= curta)
				// Passamos null para o ApexCharts deixar o bloco transparente,
				// ou 0 se preferir manter o bloco com a cor neutra.
				dadosDaSerie.push({
					x: `L${longa}`,
					y: null, // Mantém o grid simétrico sem estragar as cores do Heatmap
				});
			}
		}

		seriesDoApex.push({
			name: `C${curta}`,
			data: dadosDaSerie,
		});
	}

	return seriesDoApex;
}
