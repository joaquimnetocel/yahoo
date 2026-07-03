import { SMA } from 'technicalindicators';

export function indicadorMediaMovel({
	valores,
	periodo,
}: {
	valores: number[];
	periodo: number;
}): number[] {
	return SMA.calculate({ period: periodo, values: valores });
}
