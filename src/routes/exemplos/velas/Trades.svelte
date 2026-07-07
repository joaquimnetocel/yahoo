<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

	let {
		simbolo,
		velas,
		linhas,
	}: {
		simbolo: string;
		velas: tipoVelaDoApexcharts[];
		linhas: tipoLinhaDoApexCharts[];
	} = $props();

	const trades = $derived(
		funcaoCalcularTrades({
			velas,
			linhas: linhas.map((corrente) => corrente.dados),
		}),
	);
</script>

<h2 class="text-lg font-bold mb-2">EXIBINDO GRÁFICO DE: {simbolo}</h2>
<GraficoDeVelas {velas} exibir={true} {linhas} {trades} />
