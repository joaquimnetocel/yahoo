<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';

	let { numeros = $bindable([]) }: { numeros: number[] } = $props();
</script>

<div class="p-6 max-w-sm space-y-4">
	<h3 class="font-medium text-sm">Preencha os valores:</h3>

	<div class="space-y-1">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each numeros as _, index (index)}
			<div class="flex items-center gap-2">
				<Input type="number" bind:value={numeros[index]} class="w-18" />

				<Button
					variant="destructive"
					class="cursor-pointer"
					size="icon"
					onclick={() => {
						numeros.splice(index, 1);
					}}>✕</Button
				>
			</div>
		{/each}
	</div>

	<Button
		class="w-full cursor-pointer"
		onclick={() => {
			numeros.push(0);
		}}
		size="sm"
	>
		+ ADICIONAR
	</Button>
</div>
