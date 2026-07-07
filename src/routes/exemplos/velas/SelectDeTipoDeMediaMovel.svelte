<script lang="ts">
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import * as RadioGroup from '$lib/shadcn/componentes/ui/radio-group/index.js';
	// import * as Select from '$lib/shadcn/componentes/ui/select/index.js';

	let { tipoDeMediaMovel = $bindable() }: { tipoDeMediaMovel: 'simples' | 'exponencial' } =
		$props();
</script>

<!-- <Label>TIPO DE MÉDIA MÓVEL:</Label>
<Select.Root type="single" bind:value={tipoDeMediaMovel}>
	<Select.Trigger>SIMPLES</Select.Trigger>
	<Select.Content>
		<Select.Item value="simples" label="SIMPLES">SIMPLES</Select.Item>
		<Select.Item value="exponencial" label="exponencial">EXPONENCIAL</Select.Item>
	</Select.Content>
</Select.Root> -->

<Label>TIPO DE MÉDIA MÓVEL:</Label>
<RadioGroup.Root bind:value={tipoDeMediaMovel}>
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
