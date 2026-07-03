import { query } from '$app/server';
import { funcaoConstruirOpcoesParaYahooFinance } from '$lib/yahooFinance/funcoes/funcaoConstruirOpcoesParaYahooFinance';
import { funcaoPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/funcaoPegarDadosDoYahooFinance.server';
import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/yahooFinance/tipoIntervaloDoYahooFinance';
import * as v from 'valibot';

const intervalosDoYahooFinance = [
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

const schemaFuncaoLer = v.object({
	simbolo: v.pipe(v.string(), v.trim(), v.minLength(1)),
	intervalo: v.optional(v.picklist(intervalosDoYahooFinance)),
	fim: v.optional(v.date()),
	periodos: v.pipe(v.number(), v.integer(), v.minValue(1)),
});

export const funcaoLer = query(schemaFuncaoLer, async ({ simbolo, intervalo, fim, periodos }) => {
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
});
