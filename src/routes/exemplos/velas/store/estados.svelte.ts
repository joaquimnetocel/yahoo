import { constChavesMercados } from '$lib/yahooFinance/constantes/constChavesMercados';
import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/tipoIntervaloDoYahooFinance';
import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';

export class classeEstados {
	mercado = $state<keyof tipoMercados>(constChavesMercados[0]);
	simbolo = $state(constMercados[constChavesMercados[0]].ativos[0].ticker);
	periodos = $state('300');
	intervalo = $state<tipoIntervaloDoYahooFinance>('1d');
	periodosParaMediasMoveis = $state<number[]>([10, 50]);
	tipoDeMediaMovel = $state<'simples' | 'exponencial'>('simples');
}

export const estados = new classeEstados();

export type tipoEstados = typeof estados;
