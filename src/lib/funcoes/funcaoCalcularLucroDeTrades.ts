import type { tipoTrade } from '$lib/tipos/tipoTrade';

export function funcaoCalcularLucroDeTrades({ trades }: { trades: tipoTrade[] }) {
	const fatorDeLucro = trades.reduce((acumulado, corrente) => {
		return acumulado * corrente.fatorDeLucro;
	}, 1);
	return (fatorDeLucro - 1) * 100;
}
