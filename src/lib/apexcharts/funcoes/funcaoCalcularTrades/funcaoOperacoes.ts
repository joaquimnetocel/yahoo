import type { tipoFuncaoStop } from '$lib/apexcharts/tipos/tipoFuncaoStop';
import type { tipoOperacao } from '$lib/apexcharts/tipos/tipoOperacao';
import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

export const funcaoOperacoes = function ({
	possiveisPontosDeCompra,
	possiveisPontosDeVenda,
	velas,
	funcaoStop,
}: {
	possiveisPontosDeCompra: tipoPontoDoApexCharts[];
	possiveisPontosDeVenda: tipoPontoDoApexCharts[];
	velas?: tipoVelaDoApexcharts[];
	funcaoStop?: tipoFuncaoStop;
}): tipoOperacao[] {
	let pesquisandoPor: 'enumCompra' | 'enumVenda' = 'enumCompra';
	let stopAtual: number = Infinity;
	return possiveisPontosDeCompra.map((pontoDeCompraCorrente, contador): tipoOperacao => {
		const pontodeVendaCorrente = possiveisPontosDeVenda[contador];
		const deveComprar = pontoDeCompraCorrente.y !== null;
		const deveVender = pontodeVendaCorrente.y !== null;
		const naoOperar: tipoOperacao = {
			ponto: {
				x: pontoDeCompraCorrente.x,
				y: null,
			},
			tipo: 'enumNaoOperar',
		};

		if (pesquisandoPor === 'enumCompra') {
			if (deveComprar === false) {
				return naoOperar;
			}
			if (funcaoStop && velas) {
				stopAtual = funcaoStop({
					velas,
					agora: contador,
				});
			}
			pesquisandoPor = 'enumVenda';
			return {
				ponto: pontoDeCompraCorrente,
				tipo: 'enumComprar',
			};
		}

		if (pesquisandoPor === 'enumVenda') {
			if (velas && funcaoStop) {
				if (velas[contador].y[3] < stopAtual) {
					pesquisandoPor = 'enumCompra';
					return {
						tipo: 'enumVender',
						ponto: {
							// AQUI FOI NECESSÁRIO RESTITUIR O PREÇO A PARTIR DA VELA, POIS NÃO É UM PONTO DE VENDA OFICIAL (A VENDA SE DEVE AO STOP)
							x: velas[contador].x,
							y: velas[contador].y[3],
						},
					};
				}
			}

			if (deveVender === false) {
				if (contador === possiveisPontosDeCompra.length - 1) {
					return {
						tipo: 'enumAguardar',
						ponto: {
							x: pontoDeCompraCorrente.x,
							y: null,
						},
					};
				}
				return naoOperar;
			}
			pesquisandoPor = 'enumCompra';
			return {
				tipo: 'enumVender',
				ponto: pontodeVendaCorrente,
			};
		}
		return naoOperar; // NUNCA CHEGA AQUI
	});
};
