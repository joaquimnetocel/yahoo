import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { funcaoPontosDoAdx } from './funcaoPontosDoAdx';

export function funcaoLinhasDeAdx({
	velas,
	periodos,
}: {
	velas: tipoVelaDoApexcharts[];
	periodos: number[];
}): {
	linhaDoAdx: tipoLinhaDoApexCharts;
	linhaDoPdi: tipoLinhaDoApexCharts;
	linhaDoMdi: tipoLinhaDoApexCharts;
}[] {
	const periodosValidos = periodos.filter((periodo) => periodo < velas.length);

	return periodosValidos.map((periodo) => {
		const pontos = funcaoPontosDoAdx({
			velas,
			periodo,
		});

		return {
			linhaDoAdx: {
				opcoes: {
					descricao: `ADX (${periodo})`,
					cor: 'blue',
				},
				pontos: pontos.adx,
			},

			linhaDoPdi: {
				opcoes: {
					descricao: `+DI (${periodo})`,
					cor: 'blue',
				},
				pontos: pontos.pdi,
			},

			linhaDoMdi: {
				opcoes: {
					descricao: `-DI (${periodo})`,
					cor: 'blue',
				},
				pontos: pontos.mdi,
			},
		};
	});
}
