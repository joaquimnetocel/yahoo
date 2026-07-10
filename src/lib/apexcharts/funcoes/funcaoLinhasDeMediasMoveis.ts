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
	const periodosValidos = periodos.filter((numero) => numero < velas.length);
	return periodosValidos.map((periodo) => {
		const pontosDaMediaMovel = funcaoPontosDaMediaMovel({
			velas,
			periodo,
			tipo,
		});
		const linhaDaMediaMovel: tipoLinhaDoApexCharts = {
			opcoes: {
				descricao: `MÉDIA MÓVEL ${tipo === 'simples' ? 'SIMPLES' : 'EXPONENCIAL'} (${periodo})`,
				cor: 'blue',
			},
			pontos: pontosDaMediaMovel,
		};
		return linhaDaMediaMovel;
	});
}
