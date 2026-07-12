<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import Spinner from '$lib/shadcn/componentes/ui/spinner/spinner.svelte';
	import { deriveds } from '$lib/stores/storeParametrosGraficos/deriveds.svelte';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';
	import Formulario from '$lib/yahooFinance/componentes/Formulario/index.svelte';
	import Iterativo from './Iterativo.svelte';
</script>

<Iterativo />

<Formulario />

<div class="mx-6 border rounded p-4 bg-slate-50">
	{#if estados.periodos === '' || Number(estados.periodos) < 1}
		<div class="flex justify-center text-muted-foreground py-8">
			Informe um número inteiro positivo.
		</div>
	{:else}
		<div class="min-h-l00">
			{#if deriveds.promessaDeDadosDoYahooFinance.loading}
				<div class="flex h-87.5 items-center justify-center flex-col gap-2">
					<Spinner class="size-8" />
					<p class="text-sm text-muted-foreground">Buscando {estados.simbolo}...</p>
				</div>
			{:else if deriveds.promessaDeDadosDoYahooFinance.error}
				<p class="text-destructive">Erro: {deriveds.promessaDeDadosDoYahooFinance.error.message}</p>
			{:else}
				<h2 class="text-lg font-bold mb-2">
					<div class="flex justify-between">
						<div>
							EXIBINDO GRÁFICO DE: {estados.simbolo} ({deriveds.velas.length} VELAS)
						</div>
						<div class:text-green-500={deriveds.lucro > 0} class:text-red-500={deriveds.lucro < 0}>
							LUCRO: {deriveds.lucro.toFixed(4)}%
						</div>
					</div>
				</h2>
				<GraficoDeVelas
					velas={deriveds.velas}
					exibir={true}
					linhas={deriveds.linhas}
					trades={deriveds.trades}
				/>
			{/if}
		</div>
	{/if}
</div>

lucro mensal {deriveds.lucroMensal}
dias {deriveds.dias}
