import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { criterio } from './criterios';
import { funcaoOperacoes } from './funcaoOperacoes';
import { funcaoTransformarOperacoesEmTrades } from './funcaoTransformarOperacoesEmTrades';

export function funcaoCalcularTrades({
	velas,
	linhas,
}: {
	velas: tipoVelaDoApexcharts[];
	linhas: tipoPontoDoApexCharts[][];
}) {
	if (velas === undefined) throw Error;
	const operacoes = funcaoOperacoes({
		possiveisPontosDeCompra: criterio.funcaoPossiveisPontosDeCompra({ velas, linhas }),
		possiveisPontosDeVenda: criterio.funcaoPossiveisPontosDeVenda({ velas, linhas }),
		velas,
		funcaoStop: 'stop' in criterio ? criterio.stop : undefined,
	});
	const ultimoFechamento = velas[velas.length - 1].y[3];
	return funcaoTransformarOperacoesEmTrades({ operacoes, ultimoFechamento });
}
