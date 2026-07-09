<script lang="ts">
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as Select from '$lib/shadcn/componentes/ui/select/index.js';
	import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
	import { deriveds } from '../store/deriveds.svelte';
	import { estados } from '../store/estados.svelte';

	$effect(() => {
		if (deriveds.ativos.length > 0) {
			estados.simbolo = deriveds.ativos[0].ticker;
		} else {
			estados.simbolo = '';
		}
	});
</script>

<Label>ATIVO:</Label>
<Select.Root type="single" bind:value={estados.simbolo}>
	<Select.Trigger class="w-80">
		{constMercados[estados.mercado].ativos.find((ativo) => ativo.ticker === estados.simbolo)?.nome}
	</Select.Trigger>
	<Select.Content class="max-h-64 overflow-y-auto">
		{#each deriveds.ativos as ativo (ativo.ticker)}
			<Select.Item value={ativo.ticker} label={ativo.nome}>
				{ativo.nome}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
