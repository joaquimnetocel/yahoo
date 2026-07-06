<script lang="ts">
	import { Spinner } from '$lib/shadcn/componentes/ui/spinner/index.js';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
	import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/tipoIntervaloDoYahooFinance';
	import { untrack } from 'svelte';
	import MediasMoveis from './MediasMoveis.svelte';

	let {
		simbolo,
		periodos,
		intervalo,
		periodosParaMediasMoveisSimples = $bindable(),
	}: {
		simbolo: string;
		periodos: string;
		intervalo: tipoIntervaloDoYahooFinance;
		periodosParaMediasMoveisSimples: number[];
	} = $props();

	const promessa = $derived(
		remotaPegarDadosDoYahooFinance({
			periodos: Number(periodos),
			simbolo,
			intervalo,
		}),
	);

	const velas = $derived(
		promessa.ready ? funcaoConverterDeYahooFinanceParaApexchart(promessa.current) : [],
	);

	const quantidadeDeVelas = $derived(velas.length);

	// REMOVE AS MÉDIAS MÓVEIS IMPOSSÍVEIS DE CALCULAR DEVIDO À QUANTIDADE DE VELAS
	$effect(() => {
		if (promessa.ready) {
			const aux = untrack(() => periodosParaMediasMoveisSimples);
			periodosParaMediasMoveisSimples = aux.filter((numero) => numero < quantidadeDeVelas);
		}
	});
</script>

<div class="mx-6 border rounded p-4 bg-slate-50 min-h-100">
	{#if promessa.loading}
		<div class="flex h-87.5 items-center justify-center flex-col gap-2">
			<Spinner class="size-8" />
			<p class="text-sm text-muted-foreground">Buscando {simbolo}...</p>
		</div>
	{:else if promessa.error}
		<p class="text-destructive">Erro: {promessa.error.message}</p>
	{:else}
		<MediasMoveis {velas} {simbolo} {periodosParaMediasMoveisSimples} />
	{/if}
</div>
