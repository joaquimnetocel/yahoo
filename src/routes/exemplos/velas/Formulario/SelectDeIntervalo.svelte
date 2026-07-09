<script lang="ts">
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as Select from '$lib/shadcn/componentes/ui/select/index.js';
	import { constIntervalosDoYahooFinance } from '$lib/yahooFinance/constantes/constIntervalosDoYahooFinance';
	import { estados } from '../store/estados.svelte';
</script>

<Label>INTERVALO:</Label>
<Select.Root type="single" bind:value={estados.intervalo}>
	<Select.Trigger class="w-18">
		{estados.intervalo}
	</Select.Trigger>
	<Select.Content class="max-h-64 overflow-y-auto">
		{#each constIntervalosDoYahooFinance as intervaloCorrente (intervaloCorrente)}
			<Select.Item value={intervaloCorrente} label={intervaloCorrente}>
				{intervaloCorrente}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
