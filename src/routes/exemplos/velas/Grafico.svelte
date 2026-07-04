<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { funcaoLer } from './funcaoLer.remote';

	let { periodos, simbolo }: { periodos: number; simbolo: string } = $props();

	const dados = $derived(
		funcaoLer({
			periodos: periodos,
			simbolo,
			intervalo: '1d',
		}),
	);

	const velas = $derived.by(() => {
		if (dados?.ready === false) {
			return [];
		}
		return funcaoConverterDeYahooFinanceParaApexchart(dados.current);
	});
</script>

<GraficoDeVelas {velas} exibir={dados?.ready === true} />
