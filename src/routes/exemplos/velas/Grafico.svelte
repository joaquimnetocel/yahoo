<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';

	let { periodos, simbolo }: { periodos: number; simbolo: string } = $props();

	const dados = $derived(
		remotaPegarDadosDoYahooFinance({
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
