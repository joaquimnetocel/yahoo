import type { tipoDadosDoYahooFinance } from '$lib/yahooFinance/tipos/yahooFinance/tipoDadosDoYahooFinance';
import type { tipoOpcoesDoYahooFinance } from '$lib/yahooFinance/tipos/yahooFinance/tipoOpcoesDoYahooFinance';
import YahooFinance from 'yahoo-finance2';

const yf = new YahooFinance();

export async function funcaoPegarDadosDoYahooFinance({
	simbolo,
	opcoes,
}: {
	simbolo: string;
	opcoes: tipoOpcoesDoYahooFinance;
}) {
	return (await yf.chart(simbolo, opcoes)) as tipoDadosDoYahooFinance;
}
