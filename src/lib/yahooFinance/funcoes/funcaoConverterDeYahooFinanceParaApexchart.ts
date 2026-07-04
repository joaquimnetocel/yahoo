import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import type { tipoDadosDoYahooFinance } from '$lib/yahooFinance/tipos/tipoDadosDoYahooFinance';

export function funcaoConverterDeYahooFinanceParaApexchart(
	dados: tipoDadosDoYahooFinance,
): tipoVelaDoApexcharts[] {
	return dados.quotes.map((quote) => ({
		x: quote.date,
		y: [quote.open, quote.high, quote.low, quote.close] as [number, number, number, number],
	}));
}
