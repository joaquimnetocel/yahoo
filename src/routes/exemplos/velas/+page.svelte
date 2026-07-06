<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import { Spinner } from '$lib/shadcn/componentes/ui/spinner/index.js';
	import { constChavesMercados } from '$lib/yahooFinance/constantes/constChavesMercados';
	import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
	import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/tipoIntervaloDoYahooFinance';
	import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';
	import { untrack } from 'svelte';
	import Drawer from './Drawer.svelte';
	import Grafico from './Grafico.svelte';
	import InputsDeMediasMoveis from './InputsDeMediasMoveis.svelte';
	import SelectDeAtivo from './SelectDeAtivo.svelte';
	import SelectDeIntervalo from './SelectDeIntervalo.svelte';
	import SelectDeMercado from './SelectDeMercado.svelte';

	let mercado = $state<keyof tipoMercados>(constChavesMercados[0]);
	let simbolo = $state(constMercados[constChavesMercados[0]].ativos[0].ticker);
	let periodos = $state('300');
	let intervalo = $state<tipoIntervaloDoYahooFinance>('1d');
	let periodosParaMediasMoveisSimples = $state<number[]>([10, 50, 70]);
	const ativos = $derived(constMercados[mercado].ativos);

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

	$effect(() => {
		if (ativos.length > 0) {
			simbolo = ativos[0].ticker;
		} else {
			simbolo = '';
		}
	});

	// REMOVE AS MÉDIAS MÓVEIS IMPOSSÍVEIS DE CALCULAR DEVIDO À QUANTIDADE DE VELAS
	$effect(() => {
		if (promessa.ready) {
			const aux = untrack(() => periodosParaMediasMoveisSimples);
			periodosParaMediasMoveisSimples = aux.filter((numero) => numero < quantidadeDeVelas);
		}
	});
</script>

<div class="p-6 flex flex-wrap items-end gap-4 justify-center">
	<Button href={resolve('/')}>VOLTAR</Button>
	<div class="flex flex-col gap-1.5">
		<SelectDeMercado bind:mercado />
	</div>
	<div class="flex flex-col gap-1.5">
		<SelectDeAtivo {ativos} {mercado} bind:simbolo />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>PERÍODOS:</Label>
		<Input bind:value={periodos} type="number" min="1" step="1" class="w-24" />
	</div>
	<div class="flex flex-col gap-1.5">
		<SelectDeIntervalo bind:intervalo />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>MÉDIAS MÓVEIS</Label>
		<Drawer
			titulo="MÉDIAS MÓVEIS"
			descricao="Determine as médias móveis a serem exibidas no gráfico."
		>
			<div class="flex justify-center">
				<InputsDeMediasMoveis
					bind:numeros={periodosParaMediasMoveisSimples}
					titulo="MÉDIAS MÓVEIS SIMPLES (SMA)"
				/>
				<!-- <InputsDeMediasMoveis /> -->
			</div>
		</Drawer>
	</div>
</div>

{#if periodos === '' || Number(periodos) < 1}
	<div class="mx-6 border rounded p-4 bg-slate-50">
		<div class="flex justify-center text-muted-foreground py-8">
			Informe um número inteiro positivo.
		</div>
	</div>
{:else}
	<div class="mx-6 border rounded p-4 bg-slate-50 min-h-100">
		{#if promessa.loading}
			<div class="flex h-87.5 items-center justify-center flex-col gap-2">
				<Spinner class="size-8" />
				<p class="text-sm text-muted-foreground">Buscando {simbolo}...</p>
			</div>
		{:else if promessa.error}
			<p class="text-destructive">Erro: {promessa.error.message}</p>
		{:else}
			<Grafico {velas} {simbolo} {periodosParaMediasMoveisSimples} />
		{/if}
	</div>
{/if}
