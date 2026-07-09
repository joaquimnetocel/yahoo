import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
import type { tipoDadosDoYahooFinance } from '$lib/yahooFinance/tipos/tipoDadosDoYahooFinance';
import type { RemoteQuery } from '@sveltejs/kit';

export function funcaoVelas({ promessa }: { promessa: RemoteQuery<tipoDadosDoYahooFinance> }) {
	return promessa.ready ? funcaoConverterDeYahooFinanceParaApexchart(promessa.current) : [];
}
