<script lang="ts">
	import GraficoHeatMap from '$lib/apexcharts/componentes/GraficoHeatMap.svelte';
	// import { funcaoMaiorLucro } from './aa';
	import Calculos from './Calculos.svelte';
	import { funcaoMatrizParaHeatmapDoApexcharts } from './funcaoMatrizParaHeatmapDoApexcharts';

	const inicioPeriodo = 10; // Deve ser par para o step de pares funcionar perfeitamente
	const maxPeriodo = 100;
	const step = 2; // Avança de 2 em 2 (apenas números pares)

	// FUNÇÃO RANGE COM STEP: Cria o array pulando de acordo com o parâmetro 'saltos'
	function funcaoRange(inicio: number, fim: number, saltos: number) {
		if (inicio > fim) return [];
		const tamanho = Math.ceil((fim - inicio + 1) / saltos);
		return Array.from({ length: tamanho }, (_, i) => inicio + i * saltos);
	}

	// ranges já nascem filtrados apenas com os números pares (10, 12, 14...)
	const rangeCurto = funcaoRange(inicioPeriodo, maxPeriodo, step);
	const rangeLongo = funcaoRange(inicioPeriodo, maxPeriodo, step);

	// Matriz absoluta preenchida com zeros
	let matriz = $state<(number | null)[][]>(
		Array.from({ length: maxPeriodo + 1 }, () =>
			Array.from({ length: maxPeriodo + 1 }, () => null),
		),
	);

	// Contador dinâmico: imita exatamente a estrutura simplificada do HTML
	const totalCalculos = (() => {
		let contagem = 0;
		for (let c = inicioPeriodo; c <= maxPeriodo; c += step) {
			for (let l = inicioPeriodo; l <= maxPeriodo; l += step) {
				if (l > c) contagem++;
			}
		}
		return contagem;
	})();

	let calculosConcluidos = $state(0);

	const matrizPronta = $derived(calculosConcluidos === totalCalculos);

	const series = $derived(
		matrizPronta
			? funcaoMatrizParaHeatmapDoApexcharts({
					matriz: matriz as number[][],
					inicioPeriodo,
					maxPeriodo,
					step,
				})
			: [],
	);
</script>

{#each rangeCurto as curta (curta)}
	{#each rangeLongo as longa (longa)}
		{#if longa > curta}
			<Calculos
				periodosParaMediasMoveis={[curta, longa]}
				bind:lucroObservado={matriz[curta][longa]}
				onFinalizado={() => calculosConcluidos++}
			/>
		{/if}
	{/each}
{/each}

<!-- TRINCA: {JSON.stringify(
	funcaoMaiorLucro({
		matriz,
	}),
)} -->

<GraficoHeatMap exibir={true} {series} />
