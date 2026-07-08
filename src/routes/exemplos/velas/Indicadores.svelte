<script lang="ts">
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
	// import { untrack } from 'svelte';
	import Trades from './Trades.svelte';

	let {
		simbolo,
		periodosParaMediasMoveis = [],
		velas,
		tipoDeMediaMovel,
	}: {
		simbolo: string;
		periodosParaMediasMoveis?: number[];
		velas: tipoVelaDoApexcharts[];
		tipoDeMediaMovel: 'simples' | 'exponencial';
	} = $props();

	const periodosValidos = $derived(
		periodosParaMediasMoveis.filter((numero) => numero < velas.length),
	);

	const mediasMoveis = $derived(
		funcaoLinhasDeMediasMoveis({
			periodos: periodosValidos,
			tipo: tipoDeMediaMovel,
			velas,
		}),
	);

	const linhas = $derived([...mediasMoveis]);

	// $effect(() => {
	// 	// Só precisamos atualizar se o tamanho for diferente (ou seja, se algo foi filtrado)
	// 	if (periodosParaMediasMoveis.length !== periodosValidos.length) {
	// 		// Usamos untrack para o Svelte não achar que o effect depende dele mesmo ao modificar
	// 		untrack(() => {
	// 			periodosParaMediasMoveis = [...periodosValidos];
	// 		});
	// 	}
	// });
</script>

<Trades {velas} {linhas} {simbolo} />
