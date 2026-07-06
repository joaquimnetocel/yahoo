import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';

export type tipoOperacao = {
	ponto: tipoPontoDoApexCharts;
	tipo: 'enumComprar' | 'enumVender' | 'enumNaoOperar' | 'enumAguardar';
};
