<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import { constChavesMercados } from '$lib/yahooFinance/constantes/constChavesMercados';
	import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
	import type { tipoIntervaloDoYahooFinance } from '$lib/yahooFinance/tipos/tipoIntervaloDoYahooFinance';
	import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';
	import Drawer from './Drawer.svelte';
	import InputsDeMediasMoveis from './InputsDeMediasMoveis.svelte';
	import Leitura from './Leitura.svelte';
	import SelectDeAtivo from './SelectDeAtivo.svelte';
	import SelectDeIntervalo from './SelectDeIntervalo.svelte';
	import SelectDeMercado from './SelectDeMercado.svelte';
	import SelectDeTipoDeMediaMovel from './SelectDeTipoDeMediaMovel.svelte';

	let mercado = $state<keyof tipoMercados>(constChavesMercados[0]);
	let simbolo = $state(constMercados[constChavesMercados[0]].ativos[0].ticker);
	let periodos = $state('300');
	let intervalo = $state<tipoIntervaloDoYahooFinance>('1d');
	let periodosParaMediasMoveis = $state<number[]>([10, 50]);
	let tipoDeMediaMovel = $state<'simples' | 'exponencial'>('simples');

	const ativos = $derived(constMercados[mercado].ativos);

	$effect(() => {
		if (ativos.length > 0) {
			simbolo = ativos[0].ticker;
		} else {
			simbolo = '';
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
			<div class="flex flex-col items-center gap-2">
				<SelectDeTipoDeMediaMovel bind:tipoDeMediaMovel />
				<div class="flex justify-center">
					<InputsDeMediasMoveis
						bind:numeros={periodosParaMediasMoveis}
						titulo={`MÉDIAS MÓVEIS ${tipoDeMediaMovel === 'simples' ? 'SIMPLES' : 'EXPONENCIAIS'} (${tipoDeMediaMovel === 'simples' ? 'SMA' : 'EMA'})`}
					/>
				</div>
			</div>
		</Drawer>
	</div>
</div>

<div class="mx-6 border rounded p-4 bg-slate-50">
	{#if periodos === '' || Number(periodos) < 1}
		<div class="flex justify-center text-muted-foreground py-8">
			Informe um número inteiro positivo.
		</div>
	{:else}
		<Leitura {intervalo} {periodos} {simbolo} bind:periodosParaMediasMoveis {tipoDeMediaMovel} />
	{/if}
</div>
