import type { tipoDadosDoYahooFinance } from '$lib/yahooFinance/tipos/tipoDadosDoYahooFinance';
import type { tipoOpcoesDoYahooFinance } from '$lib/yahooFinance/tipos/tipoOpcoesDoYahooFinance';
import YahooFinance from 'yahoo-finance2';

const yf = new YahooFinance();

export async function funcaoPegarDadosBrutosDoYahooFinance({
	simbolo,
	opcoes,
}: {
	simbolo: string;
	opcoes: tipoOpcoesDoYahooFinance;
}) {
	return (await yf.chart(simbolo, opcoes)) as tipoDadosDoYahooFinance;
}
