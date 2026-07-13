import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { funcaoPontosDoRsi } from './funcaoPontosDoRsi';

export function funcaoLinhasDeRsis({
	velas,
	periodos,
}: {
	velas: tipoVelaDoApexcharts[];
	periodos: number[];
}): tipoLinhaDoApexCharts[] {
	const periodosValidos = periodos.filter((numero) => numero < velas.length);
	return periodosValidos.map((periodo) => {
		const pontosDoRsi = funcaoPontosDoRsi({
			velas,
			periodo,
		});
		const linhaDoRsi: tipoLinhaDoApexCharts = {
			opcoes: {
				descricao: `RSI (${periodo})`,
				cor: 'blue',
			},
			pontos: pontosDoRsi,
		};
		return linhaDoRsi;
	});
}
