import type { tipoHeatmapDoApexcharts } from '$lib/apexcharts/tipos/tipoHeatmapDoApexcharts';
import type { ApexAxisChartSeries } from 'apexcharts';

export function funcaoMatrizParaHeatmapDoApexcharts({ matriz }: { matriz: number[][] }) {
	const series: tipoHeatmapDoApexcharts[] = [];

	for (let curta = 1; curta <= matriz.length - 1; curta++) {
		const data = [];

		for (let longa = curta + 1; longa <= matriz.length - 1; longa++) {
			data.push({
				x: longa.toString(),
				y: matriz[curta][longa],
			});
		}

		series.push({
			name: curta.toString(),
			data,
		});
	}
	return series;
}
