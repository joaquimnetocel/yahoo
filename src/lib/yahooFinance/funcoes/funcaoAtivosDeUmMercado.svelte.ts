import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';

export function funcaoAtivosDeUmMercado({ mercado }: { mercado: keyof tipoMercados }) {
	return constMercados[mercado].ativos;
}
