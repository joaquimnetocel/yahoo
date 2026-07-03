import { funcaoConstruirOpcoesParaYahooFinance } from '$lib/yahooFinance/funcoes/funcaoConstruirOpcoesParaYahooFinance';
import { funcaoPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/funcaoPegarDadosDoYahooFinance';
import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/yahooFinance/tipoIntervaloDoYahooFinance';

export async function funcaoLer({
	simbolo,
	intervalo,
	fim,
	periodos,
}: {
	simbolo: string;
	intervalo?: tipoIntervaloDoYahooFinance;
	fim?: Date;
	periodos: number;
}) {
	const opcoes = funcaoConstruirOpcoesParaYahooFinance({
		intervalo,
		fim,
		periodos,
	});
	const lido = await funcaoPegarDadosDoYahooFinance({
		simbolo,
		opcoes,
	});
	return lido;
}
