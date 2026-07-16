<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { Input } from '$lib/shadcn/componentes/ui/input/index.js';
	import { Label } from '$lib/shadcn/componentes/ui/label/index.js';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';
	import Drawer from './Drawer.svelte';
	import InputsDeAdx from './InputsDeAdx.svelte';
	import InputsDeMediasMoveis from './InputsDeMediasMoveis.svelte';
	import InputsDeRsis from './InputsDeRsis.svelte';
	import RadioDeTipoDeMediaMovel from './RadioDeTipoDeMediaMovel.svelte';
	import SelectDeAtivo from './SelectDeAtivo.svelte';
	import SelectDeIntervalo from './SelectDeIntervalo.svelte';
	import SelectDeMercado from './SelectDeMercado.svelte';
</script>

<div class="p-6 flex flex-wrap items-end gap-4 justify-center">
	<Button href={resolve('/')}>VOLTAR</Button>
	<div class="flex flex-col gap-1.5">
		<SelectDeMercado />
	</div>
	<div class="flex flex-col gap-1.5">
		<SelectDeAtivo />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>PERÍODOS:</Label>
		<Input bind:value={estados.periodos} type="number" min="1" step="1" class="w-24" />
	</div>
	<div class="flex flex-col gap-1.5">
		<SelectDeIntervalo />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>MÉDIAS MÓVEIS</Label>
		<Drawer
			titulo="MÉDIAS MÓVEIS"
			descricao="Determine as médias móveis a serem exibidas no gráfico."
		>
			<div class="flex flex-col items-center gap-2">
				<RadioDeTipoDeMediaMovel />
				<div class="flex justify-center">
					<InputsDeMediasMoveis
						titulo={`MÉDIAS MÓVEIS ${estados.tipoDeMediaMovel === 'simples' ? 'SIMPLES' : 'EXPONENCIAIS'} (${estados.tipoDeMediaMovel === 'simples' ? 'SMA' : 'EMA'})`}
					/>
				</div>
			</div>
		</Drawer>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>RSIs</Label>
		<Drawer titulo="RSIs" descricao="Determine os RSIs a serem exibidas no gráfico.">
			<div class="flex flex-col items-center gap-2">
				<div class="flex justify-center">
					<InputsDeRsis />
				</div>
			</div>
		</Drawer>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>ADXs</Label>
		<Drawer titulo="ADXs" descricao="Determine os ADXs a serem exibidas no gráfico.">
			<div class="flex flex-col items-center gap-2">
				<div class="flex justify-center">
					<InputsDeAdx />
				</div>
			</div>
		</Drawer>
	</div>
</div>
