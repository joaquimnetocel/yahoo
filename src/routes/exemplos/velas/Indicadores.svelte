<script lang="ts">
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
	import Trades from './Trades.svelte';

	let {
		simbolo,
		periodosParaMediasMoveis = [],
		velas,
		tipoDeMediaMovel,
	}: {
		simbolo: string;
		periodosParaMediasMoveis?: number[];
		velas: tipoVelaDoApexcharts[];
		tipoDeMediaMovel: 'simples' | 'exponencial';
	} = $props();

	const mediasMoveis = $derived(
		funcaoLinhasDeMediasMoveis({
			periodos: periodosParaMediasMoveis,
			tipo: tipoDeMediaMovel,
			velas,
		}),
	);

	const linhas = $derived([...mediasMoveis]);
</script>

<Trades {velas} {linhas} {simbolo} />
