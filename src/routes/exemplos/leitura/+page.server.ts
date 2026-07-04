import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
import { funcaoPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/funcaoPegarDadosDoYahooFinance.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const lido = await funcaoPegarDadosDoYahooFinance({
		periodos: 300,
		simbolo: 'PETR4.SA',
	});

	const velas = funcaoConverterDeYahooFinanceParaApexchart(lido);

	return {
		velas,
	};
};
