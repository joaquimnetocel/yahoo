import type { tipoIntervaloDoYahooFinance } from '../tipos/yahooFinance/tipoIntervaloDoYahooFinance';

export const constIntervalosDoYahooFinance = [
	'1m',
	'2m',
	'5m',
	'15m',
	'30m',
	'60m',
	'90m',
	'1h',
	'1d',
	'5d',
	'1wk',
	'1mo',
	'3mo',
] as const satisfies readonly tipoIntervaloDoYahooFinance[];
