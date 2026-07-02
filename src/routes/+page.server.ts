import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
import type { PageServerLoad } from './$types';
import { funcaoLer } from './funcaoLer';

export const load: PageServerLoad = async (event) => {
	const lido = await funcaoLer({
		periodos: 300,
		simbolo: 'PETR4.SA',
	});

	const velas = funcaoConverterDeYahooFinanceParaApexchart(lido);

	return {
		velas,
	};
};
