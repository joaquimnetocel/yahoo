<script lang="ts">
	import GraficoHeatMap from '$lib/apexcharts/componentes/GraficoHeatMap.svelte';
	import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import { funcaoCalcularDuracaoEmDiasDeTrades } from '$lib/funcoes/funcaoCalcularDuracaoEmDiasDeTrades';
	import { funcaoCalcularLucroDeTrades } from '$lib/funcoes/funcaoCalcularLucroDeTrades';
	import { funcaoTransformarParaLucroMensal } from '$lib/funcoes/funcaoTransformarParaLucroMensal';
	import Button from '$lib/shadcn/componentes/ui/button/button.svelte';
	import { deriveds } from '$lib/stores/storeParametrosGraficos/deriveds.svelte';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { funcaoMaioresLucros } from './funcaoMaioresLucros';
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
					const linhaCurta = cache.get(periodoCurto)!;
					const linhaLonga = cache.get(periodoLongo)!;
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

	const melhores = $derived(funcaoMaioresLucros({ matriz, quantidade: 10 }));

	const series = $derived(
		funcaoMatrizParaHeatmapDoApexcharts({
			matriz: matriz as number[][],
			inicioPeriodo,
			maxPeriodo,
			step,
		}),
	);
</script>

<div class="mx-6 border-4 border-slate-500">
	<h2 class="text-center text-lg font-bold">MAIORES RETORNOS:</h2>
	<div class="flex justify-center flex-wrap">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each Array(10) as _, i (i)}
			<Button
				onclick={() => {
					const [curtaAtual, longaAtual] = estados.periodosParaMediasMoveis;

					if (curtaAtual === melhores[i].melhorCurta && longaAtual === melhores[i].melhorLonga) {
						return;
					}

					estados.periodosParaMediasMoveis = [melhores[i].melhorCurta, melhores[i].melhorLonga];
				}}
			>
				{i + 1}ª maior ({melhores[i]?.melhorCurta}, {melhores[i]?.melhorLonga}, {melhores[
					i
				]?.lucro.toFixed(1)}%)
			</Button>
		{/each}
	</div>
</div>

<div class="mx-6 border-4 border-slate-500">
	<h2 class="text-center text-lg font-bold">HEATMAP DE RETORNOS:</h2>
	<GraficoHeatMap exibir={true} {series} />
</div>
