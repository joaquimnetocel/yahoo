<script lang="ts">
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as Select from '$lib/shadcn/componentes/ui/select/index.js';
	import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
	import type { tipoAtivo } from '$lib/yahooFinance/tipos/tipoAtivo';
	import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';

	let {
		simbolo = $bindable(),
		mercado,
		ativos,
	}: { ativos: tipoAtivo[]; simbolo: string; mercado: keyof tipoMercados } = $props();
</script>

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
