import { EMA } from 'technicalindicators';

export function indicadorMediaMovelExponencial({
	valores,
	periodo,
}: {
	valores: number[];
	periodo: number;
}): number[] {
	return EMA.calculate({ period: periodo, values: valores });
}
