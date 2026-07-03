import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { indicadorRsi } from '$lib/indicadores/indicadorRsi';

export function funcaoCriarRsiParaApexcharts({
	velas,
	periodo,
}: {
	velas: tipoVelaDoApexcharts[];
	periodo: number;
}): tipoPontoDoApexCharts[] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.y[3]);
	const rsi = indicadorRsi({
		periodo,
		valores: fechamentos,
	});

	return velas.map((current, i) => {
		if (i < periodo) {
			return {
				x: current.x,
				y: null,
			};
		}
		return {
			x: current.x,
			y: rsi[i - periodo],
		};
	});
}
