import type { tipoVelaDoApexcharts } from './tipoVelaDoApexcharts';

export type tipoFuncaoStop = ({
	velas,
	agora,
}: {
	velas: tipoVelaDoApexcharts[];
	agora: number;
}) => number;
