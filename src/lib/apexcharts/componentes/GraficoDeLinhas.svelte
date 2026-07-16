<script lang="ts">
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import type ApexCharts from 'apexcharts';

	let {
		linhas = [],
		exibir = true,
	}: {
		linhas?: tipoLinhaDoApexCharts[];
		exibir?: boolean;
	} = $props();

	let elemento = $state<HTMLDivElement>();

	const opcoes: ApexCharts.ApexOptions = {
		series: [],
		chart: {
			type: 'line',
			height: 350,
			id: 'linhas',
		},
		stroke: {
			width: 2,
			curve: 'straight',
		},
		xaxis: {
			type: 'datetime',
			tickPlacement: 'on',
			labels: {
				datetimeUTC: false,
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
			labels: {
				formatter(value: number | null) {
					return (value ?? 0).toFixed(2);
				},
			},
		},
		legend: {
			show: true,
		},
		tooltip: {
			shared: true,
			intersect: false,
		},
	};

	$effect(() => {
		if (!exibir || !elemento) return;

		void linhas;

		let cancelado = false;
		let instancia: ApexCharts | undefined;

		(async () => {
			const apex = await import('apexcharts');

			if (cancelado || !elemento) return;

			const series: ApexCharts.ApexAxisChartSeries = linhas.map((linha) => ({
				name: linha.opcoes.descricao,
				type: 'line' as const,
				data: linha.pontos,
				color: linha.opcoes.cor,
			}));

			instancia = new apex.default(elemento, {
				...opcoes,
				series,
				stroke: {
					width: linhas.map(() => 2),
					dashArray: linhas.map(() => 0),
				},
			});

			await instancia.render();
		})();

		return () => {
			cancelado = true;
			instancia?.destroy();
		};
	});
</script>

{#if exibir}
	<div bind:this={elemento} style="width:100%;"></div>
{/if}
