import type { tipoOpcoesDoYahooFinance } from '$lib/yahooFinance/tipos/yahooFinance/tipoOpcoesDoYahooFinance';

type tipoIntervalo = NonNullable<tipoOpcoesDoYahooFinance['interval']>;

export function funcaoConstruirOpcoesParaYahooFinance({
	fim = new Date(),
	periodos,
	intervalo = '1d',
}: {
	fim?: Date;
	periodos: number;
	intervalo?: tipoIntervalo;
}): tipoOpcoesDoYahooFinance {
	const inicio = new Date(fim);
	const mapa: Record<tipoIntervalo, number> = {
		'1m': 60000,
		'2m': 2 * 60000,
		'5m': 5 * 60000,
		'15m': 15 * 60000,
		'30m': 30 * 60000,
		'60m': 60 * 60000,
		'90m': 90 * 60000,
		'1h': 60 * 60000,
		'1d': 24 * 60 * 60000,
		'5d': 5 * 24 * 60 * 60000,
		'1wk': 7 * 24 * 60 * 60000,
		'1mo': 30 * 24 * 60 * 60000,
		'3mo': 90 * 24 * 60 * 60000,
	};

	inicio.setTime(fim.getTime() - periodos * mapa[intervalo]);

	return { period1: inicio, period2: fim, interval: intervalo };
}
