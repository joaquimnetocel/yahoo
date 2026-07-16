import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { ADX } from 'technicalindicators';

export function indicadorAdx({
	velas,
	periodo,
}: {
	velas: tipoVelaDoApexcharts[];
	periodo: number;
}) {
	return ADX.calculate({
		high: velas.map((v) => v.y[1]),
		low: velas.map((v) => v.y[2]),
		close: velas.map((v) => v.y[3]),
		period: periodo,
	});
}
