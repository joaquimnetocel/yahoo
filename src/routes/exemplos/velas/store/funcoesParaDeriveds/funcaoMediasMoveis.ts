import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
import { type tipoEstados } from '../estados.svelte';

export function funcaoMediasMoveis({
	estados,
	velas,
}: {
	estados: tipoEstados;
	velas: tipoVelaDoApexcharts[];
}) {
	const periodosValidos = estados.periodosParaMediasMoveis.filter(
		(numero) => numero < velas.length,
	);
	return funcaoLinhasDeMediasMoveis({
		periodos: periodosValidos,
		tipo: estados.tipoDeMediaMovel,
		velas,
	});
}
