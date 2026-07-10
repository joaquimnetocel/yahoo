<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';
	import { deriveds } from '$lib/stores/storeParametrosGraficos/deriveds.svelte';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';
	import { untrack } from 'svelte';

	let { titulo = 'PREENCHA OS VALORES' }: { titulo?: string } = $props();

	// REMOVE AS MÉDIAS MÓVEIS IMPOSSÍVEIS DE CALCULAR DEVIDO À QUANTIDADE DE VELAS
	$effect(() => {
		if (deriveds.promessaDeDadosDoYahooFinance.ready) {
			const aux = untrack(() => estados.periodosParaMediasMoveis);
			estados.periodosParaMediasMoveis = aux.filter((numero) => numero < deriveds.velas.length);
		}
	});
</script>

<div class="max-w-sm space-y-2">
	<h3 class="font-medium text-sm">{titulo}:</h3>

	<div class="flex flex-col gap-2 items-center">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each estados.periodosParaMediasMoveis as _, index (index)}
			<!-- 2. Mudamos esta div para 'flex' para colocar o Input e o Botão lado a lado e alinhados ao centro verticalmente -->
			<div class="flex items-center gap-1 w-full justify-center">
				<Input
					type="number"
					min={1}
					bind:value={estados.periodosParaMediasMoveis[index]}
					class="w-20"
					oninput={(e) => {
						const alvo = e.currentTarget;
						estados.periodosParaMediasMoveis[index] = alvo.value === '' ? 1 : Number(alvo.value);
					}}
				/>

				<Button
					variant="destructive"
					class="cursor-pointer"
					size="icon"
					onclick={() => {
						estados.periodosParaMediasMoveis.splice(index, 1);
					}}
				>
					✕
				</Button>
			</div>
		{/each}
	</div>

	<Button
		class="w-full cursor-pointer"
		onclick={() => {
			estados.periodosParaMediasMoveis.push(2);
		}}
		size="sm"
	>
		+ ADICIONAR
	</Button>
</div>
