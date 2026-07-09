import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
import { type tipoEstados } from '../estados.svelte';

export function funcaoAtivos({ estados }: { estados: tipoEstados }) {
	return constMercados[estados.mercado].ativos;
}
