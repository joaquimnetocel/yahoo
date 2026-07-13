<script lang="ts">
	import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import { funcaoCalcularDuracaoEmDiasDeTrades } from '$lib/funcoes/funcaoCalcularDuracaoEmDiasDeTrades';
	import { funcaoCalcularLucroDeTrades } from '$lib/funcoes/funcaoCalcularLucroDeTrades';
	import { funcaoTransformarParaLucroMensal } from '$lib/funcoes/funcaoTransformarParaLucroMensal';
	import { deriveds } from '$lib/stores/storeParametrosGraficos/deriveds.svelte';
	import { estados } from '$lib/stores/storeParametrosGraficos/estados.svelte';

	let {
		periodosParaMediasMoveis,
		// eslint-disable-next-line no-useless-assignment
		lucroObservado = $bindable(),
		onFinalizado,
	}: {
		periodosParaMediasMoveis: number[];
		lucroObservado: number | null;
		onFinalizado?: () => void;
	} = $props();

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
	const lucro = $derived(
		funcaoCalcularLucroDeTrades({
			trades,
		}),
	);
	const dias = $derived(
		funcaoCalcularDuracaoEmDiasDeTrades({
			trades,
		}),
	);
	const lucroMensal = $derived(
		funcaoTransformarParaLucroMensal({
			dias,
			lucro,
		}),
	);

	$effect(() => {
		lucroObservado = lucroMensal;

		if (!finalizado) {
			finalizado = true;
			onFinalizado?.();
		}
	});
</script>
