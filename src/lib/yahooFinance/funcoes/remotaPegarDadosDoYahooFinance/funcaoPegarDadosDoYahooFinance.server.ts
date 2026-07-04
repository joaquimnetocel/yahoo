import type { tipoDadosDoYahooFinance } from '../../tipos/tipoDadosDoYahooFinance';
import type { tipoIntervaloDoYahooFinance } from '../../tipos/tipoIntervaloDoYahooFinance';
import { funcaoConstruirOpcoesParaYahooFinance } from './funcaoConstruirOpcoesParaYahooFinance.server';
import { funcaoLimparDadosDoYahooFinance } from './funcaoLimparDadosDoYahooFinance.server'; // Ajuste o caminho conforme necessário
import { funcaoPegarDadosBrutosDoYahooFinance } from './funcaoPegarDadosBrutosDoYahooFinance.server';

/**
 * Busca os dados do Yahoo Finance aplicando uma compensação de período
 * e higieniza o resultado removendo candles nulos.
 */
export async function funcaoPegarDadosDoYahooFinance({
	simbolo,
	intervalo,
	fim,
	periodos,
}: {
	simbolo: string;
	intervalo?: tipoIntervaloDoYahooFinance;
	fim?: Date;
	periodos: number;
}): Promise<tipoDadosDoYahooFinance> {
	// 1. Constrói opções pedindo 1 período a mais para compensar possíveis nulos
	const opcoes = funcaoConstruirOpcoesParaYahooFinance({
		intervalo,
		fim,
		periodos: periodos + 1,
	});

	// 2. Busca os dados brutos da API
	const lido = await funcaoPegarDadosBrutosDoYahooFinance({
		simbolo,
		opcoes,
	});

	// 3. Limpa os nulos e limita ao tamanho exato requisitado de períodos
	return funcaoLimparDadosDoYahooFinance({ lido, periodos });
}
