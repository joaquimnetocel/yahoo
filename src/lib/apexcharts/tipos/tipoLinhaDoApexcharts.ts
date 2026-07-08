import type { tipoPontoDoApexCharts } from './tipoPontoDoApexcharts';

export type tipoLinhaDoApexCharts = {
	opcoes: {
		descricao: string;
		cor: string;
	};
	pontos: tipoPontoDoApexCharts[];
};
