import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { indicadorAdx } from '$lib/indicadores/indicadorAdx';

export function funcaoPontosDoAdx({
	velas,
	periodo,
}: {
	velas: tipoVelaDoApexcharts[];
	periodo: number;
}): {
	adx: tipoPontoDoApexCharts[];
	pdi: tipoPontoDoApexCharts[];
	mdi: tipoPontoDoApexCharts[];
} {
	if (velas.length === 0) {
		return {
			adx: [],
			pdi: [],
			mdi: [],
		};
	}

	const valores = indicadorAdx({
		velas,
		periodo,
	});

	const offset = velas.length - valores.length;

	function criarLinha(campo: 'adx' | 'pdi' | 'mdi'): tipoPontoDoApexCharts[] {
		return velas.map((vela, indice) => ({
			x: vela.x,
			y: indice < offset ? null : valores[indice - offset][campo],
		}));
	}

	return {
		adx: criarLinha('adx'),
		pdi: criarLinha('pdi'),
		mdi: criarLinha('mdi'),
	};
}
