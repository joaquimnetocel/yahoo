<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as Select from '$lib/shadcn/componentes/ui/select/index.js';
	import { constChavesMercados } from '$lib/yahooFinance/constantes/constChavesMercados';
	import { constIntervalosDoYahooFinance } from '$lib/yahooFinance/constantes/constIntervalosDoYahooFinance';
	import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
	import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/tipoIntervaloDoYahooFinance';
	import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';
	import Grafico from './Grafico.svelte';

	let mercado = $state<keyof tipoMercados>(constChavesMercados[0]);
	let simbolo = $state('');
	let periodos = $state('300');
	let intervalo = $state<tipoIntervaloDoYahooFinance>('1d');
	const ativos = $derived(constMercados[mercado].ativos);

	$effect(() => {
		if (ativos.length > 0) {
			simbolo = ativos[0].ticker;
		} else {
			simbolo = '';
		}
	});
</script>

<div class="p-6 flex flex-wrap items-end gap-4">
	<Button href={resolve('/')}>VOLTAR</Button>
	<div class="flex flex-col gap-1.5">
		<Label>MERCADO:</Label>
		<Select.Root type="single" bind:value={mercado}>
			<Select.Trigger class="w-40">{constMercados[mercado].titulo}</Select.Trigger>
			<Select.Content>
				{#each constChavesMercados as chave (chave)}
					<Select.Item value={chave} label={constMercados[chave].titulo}>
						{constMercados[chave].titulo}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>ATIVO:</Label>
		<Select.Root type="single" bind:value={simbolo}>
			<Select.Trigger class="w-80">
				{constMercados[mercado].ativos.find((ativo) => ativo.ticker === simbolo)?.nome}
			</Select.Trigger>
			<Select.Content class="max-h-64 overflow-y-auto">
				{#each ativos as ativo (ativo.ticker)}
					<Select.Item value={ativo.ticker} label={ativo.nome}>
						{ativo.nome}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>PERÍODOS:</Label>
		<Input bind:value={periodos} type="number" min="1" step="1" class="w-24" />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>INTERVALO:</Label>
		<Select.Root type="single" bind:value={intervalo}>
			<Select.Trigger class="w-18">
				{intervalo}
			</Select.Trigger>
			<Select.Content class="max-h-64 overflow-y-auto">
				{#each constIntervalosDoYahooFinance as intervaloCorrente (intervaloCorrente)}
					<Select.Item value={intervaloCorrente} label={intervaloCorrente}>
						{intervaloCorrente}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
</div>

<div class="mx-6 border rounded p-4 bg-slate-50">
	{#if periodos === '' || Number(periodos) < 1}
		<div class="flex justify-center text-muted-foreground py-8">
			Informe um número inteiro positivo.
		</div>
	{:else}
		<div class="min-h-100">
			<Grafico periodos={Number(periodos)} {simbolo} {intervalo} />
		</div>
	{/if}
</div>

<div class="mx-4 border rounded p-4 bg-slate-50">
	{#if periodos === '' || Number(periodos) < 1}
		<div class="flex justify-center">Informe um número inteiro positivo.</div>
	{:else}
		<div class=" min-h-100">
			<Grafico periodos={Number(periodos)} {simbolo} {intervalo} />
		</div>
	{/if}
</div>
