import { Highest } from 'technicalindicators';

export function indicadorHighest({
	valores,
	periodo,
}: {
	valores: number[];
	periodo: number;
}): number[] {
	return Highest.calculate({ period: periodo, values: valores });
}
