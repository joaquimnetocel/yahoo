<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { Spinner } from '$lib/shadcn/componentes/ui/spinner/index.js';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
	import type { tipoIntervalo } from '$lib/yahooFinance/tipos/tipoIntervalo';

	let {
		periodos,
		simbolo,
		intervalo,
	}: { periodos: number; simbolo: string; intervalo: tipoIntervalo } = $props();

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
		<GraficoDeVelas {velas} exibir={true} />
	{/if}
</div>
