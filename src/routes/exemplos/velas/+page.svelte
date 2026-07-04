<script lang="ts">
	import Grafico from './Grafico.svelte';

	let periodos = $state('300');
</script>

<label>
	Períodos
	<input bind:value={periodos} type="number" min="1" step="1" />
</label>

{#if periodos === '' || Number(periodos) < 1}
	<p>Informe um número inteiro positivo.</p>
{:else}
	<Grafico periodos={Number(periodos)} simbolo="PETR4.SA" />
{/if}
