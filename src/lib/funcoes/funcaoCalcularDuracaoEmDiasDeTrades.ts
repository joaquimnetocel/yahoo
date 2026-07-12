import type { tipoTrade } from '$lib/tipos/tipoTrade';
import { funcaoTempoEmDiasEntreDuasDatas } from './funcaoTempoEmDiasEntreDuasDatas';

export function funcaoCalcularDuracaoEmDiasDeTrades({ trades }: { trades: tipoTrade[] }) {
	return trades.reduce((acumulado, corrente) => {
		return (
			acumulado +
			funcaoTempoEmDiasEntreDuasDatas({
				dataInicial: corrente.dataDaCompra,
				dataFinal: corrente.dataDaVenda,
			})
		);
	}, 0);
}
