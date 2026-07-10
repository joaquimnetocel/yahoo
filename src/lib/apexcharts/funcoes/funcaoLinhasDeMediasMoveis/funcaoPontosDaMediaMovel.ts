import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { indicadorMediaMovelExponencial } from '$lib/indicadores/indicadorMediaMovelExponencial';
import { indicadorMediaMovelSimples } from '$lib/indicadores/indicadorMediaMovelSimples';

export function funcaoPontosDaMediaMovel({
	velas,
	periodo,
	tipo = 'simples',
}: {
	velas: tipoVelaDoApexcharts[];
	periodo: number;
	tipo?: 'simples' | 'exponencial';
}): tipoPontoDoApexCharts[] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.y[3]);
	const indicador =
		tipo === 'exponencial' ? indicadorMediaMovelExponencial : indicadorMediaMovelSimples;
	const mediasmoveis = indicador({
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
