import { SMA } from 'technicalindicators';

export function indicadorMediaMovelSimples({
	valores,
	periodo,
}: {
	valores: number[];
	periodo: number;
}): number[] {
	return SMA.calculate({ period: periodo, values: valores });
}
