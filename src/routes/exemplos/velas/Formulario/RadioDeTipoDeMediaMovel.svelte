<script lang="ts">
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as RadioGroup from '$lib/shadcn/componentes/ui/radio-group/index.js';
	import { estados } from '$lib/store/estados.svelte';
</script>

<Label>TIPO DE MÉDIA MÓVEL:</Label>
<RadioGroup.Root bind:value={estados.tipoDeMediaMovel}>
	<div class="flex justify-center gap-5">
		<div class="flex items-center space-x-2">
			<Label>
				<RadioGroup.Item value="simples" />
				SIMPLES
			</Label>
		</div>
		<div class="flex items-center space-x-2">
			<Label>
				<RadioGroup.Item value="exponencial" />
				EXPONENCIAL
			</Label>
		</div>
	</div>
</RadioGroup.Root>
