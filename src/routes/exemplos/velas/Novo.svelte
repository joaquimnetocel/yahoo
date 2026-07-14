<script lang="ts">
	import GraficoHeatMap from '$lib/apexcharts/componentes/GraficoHeatMap.svelte';
	import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import { funcaoCalcularDuracaoEmDiasDeTrades } from '$lib/funcoes/funcaoCalcularDuracaoEmDiasDeTrades';
	import { funcaoCalcularLucroDeTrades } from '$lib/funcoes/funcaoCalcularLucroDeTrades';
	import { funcaoTransformarParaLucroMensal } from '$lib/funcoes/funcaoTransformarParaLucroMensal';
	import { deriveds } from '$lib/stores/storeParametrosGraficos/deriveds.svelte';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { funcaoMatrizParaHeatmapDoApexcharts } from './funcaoMatrizParaHeatmapDoApexcharts';

	const inicioPeriodo = 9; // Deve ser par para o step de pares funcionar perfeitamente
	const maxPeriodo = 200;
	const step = 3; // Avança de 2 em 2 (apenas números pares)

	function funcaoRange(inicio: number, fim: number, saltos: number) {
		if (inicio > fim) return [];
		const tamanho = Math.ceil((fim - inicio + 1) / saltos);
		return Array.from({ length: tamanho }, (_, i) => inicio + i * saltos);
	}

	const range = funcaoRange(inicioPeriodo, maxPeriodo, step);

	// Matriz preenchida com nulls
	let matriz = $state<(number | null)[][]>(
		Array.from({ length: maxPeriodo + 1 }, () =>
			Array.from({ length: maxPeriodo + 1 }, () => null),
		),
	);

	$effect(() => {
		if (deriveds.velas.length === 0) {
			return;
		}
		const cache = new SvelteMap<number, tipoLinhaDoApexCharts>();

		for (const periodo of range) {
			cache.set(
				periodo,
				funcaoLinhasDeMediasMoveis({
					velas: deriveds.velas,
					tipo: estados.tipoDeMediaMovel,
					periodos: [periodo],
				})[0],
			);
		}

		const novaMatriz = Array.from({ length: maxPeriodo + 1 }, (): (number | null)[] =>
			Array(maxPeriodo + 1).fill(null),
		);

		for (const periodoCurto of range) {
			for (const periodoLongo of range) {
				if (periodoCurto < periodoLongo) {
					const linhaCurta = cache.get(periodoCurto) as tipoLinhaDoApexCharts;
					const linhaLonga = cache.get(periodoLongo) as tipoLinhaDoApexCharts;
					const trades = funcaoCalcularTrades({
						velas: deriveds.velas,
						linhas: [linhaCurta, linhaLonga],
					});
					const lucro = funcaoCalcularLucroDeTrades({
						trades,
					});
					const dias = funcaoCalcularDuracaoEmDiasDeTrades({
						trades,
					});
					const lucroMensal = funcaoTransformarParaLucroMensal({
						dias,
						lucro,
					});
					novaMatriz[periodoCurto][periodoLongo] = lucroMensal;
				}
			}
		}
		matriz = novaMatriz;
	});

	const series = $derived(
		funcaoMatrizParaHeatmapDoApexcharts({
			matriz: matriz as number[][],
			inicioPeriodo,
			maxPeriodo,
			step,
		}),
	);
</script>

{#key estados.simbolo}
	<GraficoHeatMap exibir={true} {series} />
{/key}
