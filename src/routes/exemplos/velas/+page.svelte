<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
	import { funcaoLer } from './funcaoLer.remote';

	let estadoPeriodos = $state('300');

	const dados = $derived.by(() => {
		const periodos = Number(estadoPeriodos);
		if (Number.isInteger(periodos) === false || periodos < 1) {
			return;
		}
		return funcaoLer({
			periodos,
			simbolo: 'PETR4.SA',
		});
	});

	const velas = $derived.by(() => {
		if (dados === undefined || dados?.ready === false) {
			return [];
		}
		return funcaoConverterDeYahooFinanceParaApexchart(dados.current);
	});
</script>

<label>
	Períodos
	<input bind:value={estadoPeriodos} type="number" min="1" step="1" />
</label>

<GraficoDeVelas {velas} exibir={dados?.ready === true} />
