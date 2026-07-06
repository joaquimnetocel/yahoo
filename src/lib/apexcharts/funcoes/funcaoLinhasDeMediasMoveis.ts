import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { funcaoPontosDaMediaMovel } from './funcaoPontosDaMediaMovel';

export function funcaoLinhasDeMediasMoveis({
	velas,
	periodos,
	tipo,
}: {
	velas: tipoVelaDoApexcharts[];
	periodos: number[];
	tipo: 'simples' | 'exponencial';
}): tipoLinhaDoApexCharts[] {
	return periodos.map((periodo) => {
		const pontosDaMediaMovel = funcaoPontosDaMediaMovel({
			velas,
			periodo,
			tipo,
		});
		const linhaDaMediaMovel: tipoLinhaDoApexCharts = {
			opcoes: {
				descricao: `MÉDIA MÓVEL SIMPLES (${periodo})`,
				cor: 'blue',
			},
			dados: pontosDaMediaMovel,
		};
		return linhaDaMediaMovel;
	});
}
