import { RSI } from 'technicalindicators';

export function indicadorRsi({
	valores,
	periodo,
}: {
	valores: number[];
	periodo: number;
}): number[] {
	return RSI.calculate({ period: periodo, values: valores });
}
