import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
import { type tipoEstados } from '../estados.svelte';

export function funcaoPromessaDeDadosDoYahooFinance({ estados }: { estados: tipoEstados }) {
	return remotaPegarDadosDoYahooFinance({
		periodos: Number(estados.periodos),
		simbolo: estados.simbolo,
		intervalo: estados.intervalo,
	});
}
