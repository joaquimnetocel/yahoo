import { Lowest } from 'technicalindicators';

export function indicadorLowest({
	valores,
	periodo,
}: {
	valores: number[];
	periodo: number;
}): number[] {
	return Lowest.calculate({ period: periodo, values: valores });
}
