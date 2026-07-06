import type { tipoOperacao } from '$lib/apexcharts/tipos/tipoOperacao';
import type { tipoTrade } from '$lib/apexcharts/tipos/tipoTrade';

export const funcaoTransformarOperacoesEmTrades = function ({
	operacoes,
	ultimoFechamento,
}: {
	operacoes: tipoOperacao[];
	ultimoFechamento: number;
}): tipoTrade[] {
	let dataDaCompra: Date;
	let precoDeCompra: number;
	let contadorNoInstanteDaCompra: number;
	const trades: tipoTrade[] = [];
	operacoes.forEach((operacaoCorrente, contador) => {
		if (operacaoCorrente.tipo === 'enumNaoOperar') {
			if (contador !== operacoes.length - 1) {
				return;
			}
		}
		if (operacaoCorrente.tipo === 'enumComprar' && operacaoCorrente.ponto.y !== null) {
			if (contador === operacoes.length - 1) {
				trades.push({
					dataDaCompra: operacaoCorrente.ponto.x,
					precoDeCompra,
					dataDaVenda: operacaoCorrente.ponto.x,
					precoDeVenda: operacaoCorrente.ponto.y,
					lucro: 0,
					enumGanhoOuPerda: 'enumNaoRealizado',
					fatorDeLucro: 1,
					duracao: 0,
				});
			}
			dataDaCompra = operacaoCorrente.ponto.x;
			precoDeCompra = operacaoCorrente.ponto.y;
			contadorNoInstanteDaCompra = contador;
			return;
		}
		if (operacaoCorrente.tipo === 'enumVender' && operacaoCorrente.ponto.y !== null) {
			const lucro = operacaoCorrente.ponto.y - precoDeCompra;
			trades.push({
				dataDaCompra,
				precoDeCompra,
				dataDaVenda: operacaoCorrente.ponto.x,
				precoDeVenda: operacaoCorrente.ponto.y,
				lucro,
				enumGanhoOuPerda: lucro > 0 ? 'enumGanho' : 'enumPerda',
				fatorDeLucro: operacaoCorrente.ponto.y / precoDeCompra,
				duracao: contador - contadorNoInstanteDaCompra,
			});
		}
		if (operacaoCorrente.tipo === 'enumAguardar') {
			const lucro = ultimoFechamento - precoDeCompra;
			trades.push({
				dataDaCompra: dataDaCompra,
				precoDeCompra: precoDeCompra,
				dataDaVenda: operacaoCorrente.ponto.x,
				precoDeVenda: ultimoFechamento,
				lucro: lucro,
				enumGanhoOuPerda: 'enumNaoRealizado',
				fatorDeLucro: ultimoFechamento / precoDeCompra,
				duracao: contador - contadorNoInstanteDaCompra,
			});
		}
	});
	return trades;
};
