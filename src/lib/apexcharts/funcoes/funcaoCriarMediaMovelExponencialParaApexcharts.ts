import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { indicadorMediaMovelExponencial } from '$lib/indicadores/indicadorMediaMovelExponencial';

export function funcaoCriarMediaMovelExponencial({
	velas,
	periodo,
}: {
	velas: tipoVelaDoApexcharts[];
	periodo: number;
}): tipoPontoDoApexCharts[] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.y[3]);
	const mediasmoveis = indicadorMediaMovelExponencial({
		periodo,
		valores: fechamentos,
	});

	return velas.map((current, i) => {
		if (i < periodo - 1) {
			return {
				x: current.x,
				y: null,
			};
		}
		return {
			x: current.x,
			y: mediasmoveis[i - periodo + 1],
		};
	});
}
