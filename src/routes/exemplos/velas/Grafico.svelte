<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoCriarMediaMovelParaApexcharts } from '$lib/apexcharts/funcoes/funcaoCriarMediaMovelParaApexcharts';
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
	import { Spinner } from '$lib/shadcn/componentes/ui/spinner/index.js';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
	import type { tipoIntervalo } from '$lib/yahooFinance/tipos/tipoIntervalo';

	let {
		// eslint-disable-next-line no-useless-assignment
		quantidadeDeVelas = $bindable(),
		periodos,
		simbolo,
		intervalo,
		periodosParaMediasMoveisSimples = [],
		// periodosParaMediasMoveisExponenciais = [],
	}: {
		quantidadeDeVelas?: number;
		periodos: number;
		simbolo: string;
		intervalo: tipoIntervalo;
		periodosParaMediasMoveisSimples?: number[];
		// periodosParaMediasMoveisExponenciais?: number[];
	} = $props();

	const promessa = $derived(
		remotaPegarDadosDoYahooFinance({
			periodos: periodos,
			simbolo: simbolo,
			intervalo,
		}),
	);

	const velas = $derived(
		promessa.ready ? funcaoConverterDeYahooFinanceParaApexchart(promessa.current) : [],
	);

	const mediasMoveisSimples: tipoLinhaDoApexCharts[] = $derived.by(() => {
		return periodosParaMediasMoveisSimples.map((periodo) => {
			const pontosDoApexcharts: tipoPontoDoApexCharts[] = funcaoCriarMediaMovelParaApexcharts({
				velas,
				periodo,
			});
			const linhaDoApexcharts: tipoLinhaDoApexCharts = {
				opcoes: {
					descricao: `MÉDIA MÓVEL SIMPLES (${periodo})`,
					cor: 'blue',
				},
				dados: pontosDoApexcharts,
			};
			return linhaDoApexcharts;
		});
	});

	$effect(() => {
		if (promessa.ready) {
			quantidadeDeVelas = velas.length;
		}
	});
</script>

<div class="border rounded p-4 bg-slate-50 min-h-100">
	{#if promessa.loading}
		<div class="flex h-87.5 items-center justify-center flex-col gap-2">
			<Spinner class="size-8" />
			<p class="text-sm text-muted-foreground">Buscando {simbolo}...</p>
		</div>
	{:else if promessa.error}
		<p class="text-destructive">Erro: {promessa.error.message}</p>
	{:else}
		<h2 class="text-lg font-bold mb-2">EXIBINDO GRÁFICO DE: {simbolo}</h2>
		<GraficoDeVelas {velas} exibir={true} linhas={mediasMoveisSimples} />
	{/if}
</div>
