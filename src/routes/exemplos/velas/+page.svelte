<script lang="ts">
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import Grafico from './Grafico.svelte';
	let periodos = $state('300');
	let simbolo = $state('PETR4.SA');
</script>

<div class="p-6 space-y-4">
	<Label class="font-medium">
		SELECIONE O ATIVO:
		<select bind:value={simbolo} class="border p-2 rounded block mt-1">
			<option value="PETR4.SA">PETR4</option>
			<option value="VALE3.SA">VALE3</option>
		</select>
	</Label>
	<Label class="font-medium">
		PERÍODOS:
		<Input bind:value={periodos} type="number" min="1" step="1" class="max-w-24" />
	</Label>
</div>

<div class="mx-4 border rounded p-4 bg-slate-50">
	{#if periodos === '' || Number(periodos) < 1}
		<div class="flex justify-center">Informe um número inteiro positivo.</div>
	{:else}
		<div class=" min-h-100">
			<Grafico periodos={Number(periodos)} {simbolo} />
		</div>
	{/if}
</div>
