<script lang="ts">
	import GraficoHeatMap from '$lib/apexcharts/componentes/GraficoHeatMap.svelte';
	// import { funcaoMaiorLucro } from './aa';
	import Calculos from './Calculos.svelte';
	import { funcaoMatrizParaHeatmapDoApexcharts } from './funcaoMatrizParaHeatmapDoApexcharts';

	const maxPeriodo = 100;

	let matriz = $state(Array.from({ length: maxPeriodo + 1 }, () => Array<number>(maxPeriodo + 1)));

	function funcaoRange(inicio: number, fim: number) {
		return Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
	}

	const totalCalculos = (maxPeriodo * (maxPeriodo - 1)) / 2;

	let calculosConcluidos = $state(0);

	const matrizPronta = $derived(calculosConcluidos === totalCalculos);

	const series = $derived(matrizPronta ? funcaoMatrizParaHeatmapDoApexcharts({ matriz }) : []);
</script>

{#each funcaoRange(1, maxPeriodo) as curta (curta)}
	{#each funcaoRange(curta + 1, maxPeriodo) as longa (longa)}
		<Calculos
			periodosParaMediasMoveis={[curta, longa]}
			bind:lucroObservado={matriz[curta][longa]}
			onFinalizado={() => calculosConcluidos++}
		/>
	{/each}
{/each}

<!-- TRINCA: {JSON.stringify(
	funcaoMaiorLucro({
		matriz,
	}),
)} -->

<GraficoHeatMap exibir={true} {series} />
