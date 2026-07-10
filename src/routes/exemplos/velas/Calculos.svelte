<script lang="ts">
	import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import { funcaoCalcularLucroDeTrades } from '$lib/funcoes/funcaoCalcularLucroDeTrades';
	import { deriveds } from '$lib/stores/storeParametrosGraficos/deriveds.svelte';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';

	let {
		periodosParaMediasMoveis,
		// eslint-disable-next-line no-useless-assignment
		lucro = $bindable(),
		onFinalizado,
	}: { periodosParaMediasMoveis: number[]; lucro: number; onFinalizado?: () => void } = $props();

	let finalizado = $state(false);

	const mediasMoveis = $derived(
		funcaoLinhasDeMediasMoveis({
			periodos: periodosParaMediasMoveis,
			tipo: estados.tipoDeMediaMovel,
			velas: deriveds.velas,
		}),
	);

	const linhas = $derived([...mediasMoveis]);
	const trades = $derived(
		funcaoCalcularTrades({
			velas: deriveds.velas,
			linhas: linhas,
		}),
	);
	const derivedLucro = $derived(
		funcaoCalcularLucroDeTrades({
			trades: trades,
		}),
	);

	$effect(() => {
		lucro = derivedLucro;

		if (!finalizado) {
			finalizado = true;
			onFinalizado?.();
		}
	});
</script>
