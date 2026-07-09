<script lang="ts">
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as Select from '$lib/shadcn/componentes/ui/select/index.js';
	import { constChavesMercados } from '$lib/yahooFinance/constantes/constChavesMercados';
	import { constMercados } from '$lib/yahooFinance/constantes/constMercados';
	import { estados } from '../store/estados.svelte';
</script>

<Label>MERCADO:</Label>
<Select.Root type="single" bind:value={estados.mercado}>
	<Select.Trigger class="w-40">{constMercados[estados.mercado].titulo}</Select.Trigger>
	<Select.Content>
		{#each constChavesMercados as chave (chave)}
			<Select.Item value={chave} label={constMercados[chave].titulo}>
				{constMercados[chave].titulo}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
