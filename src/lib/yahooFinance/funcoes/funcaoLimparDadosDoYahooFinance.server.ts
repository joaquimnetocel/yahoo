import type { tipoDadosDoYahooFinance } from '$lib/yahooFinance/tipos/yahooFinance/tipoDadosDoYahooFinance';

/**
 * Remove candles que contenham valores nulos e garante que o retorno
 * contenha exatamente a quantidade de períodos solicitada.
 */
export function funcaoLimparDadosDoYahooFinance({
	lido,
	periodos,
}: {
	lido: tipoDadosDoYahooFinance;
	periodos: number;
}): tipoDadosDoYahooFinance {
	// 1. Removemos os nulos (se o último ou qualquer outro for nulo, ele cai aqui)
	const quotesFiltrados = lido.quotes.filter((vela) => {
		return vela.open !== null && vela.high !== null && vela.low !== null && vela.close !== null;
	});

	// 2. Pegamos exatamente os últimos "periodos" solicitados da lista limpa
	const quotesFinais = quotesFiltrados.slice(-periodos);

	// 3. Devolvemos a estrutura idêntica, apenas com as quotes corrigidas
	return {
		...lido,
		quotes: quotesFinais,
	};
}
