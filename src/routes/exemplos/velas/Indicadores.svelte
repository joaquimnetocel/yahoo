<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

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

<h2 class="text-lg font-bold mb-2">EXIBINDO GRÁFICO DE: {simbolo}</h2>
<GraficoDeVelas {velas} exibir={true} {linhas} />
