<script lang="ts">
	import type ApexCharts from 'apexcharts';
	import type { ApexAxisChartSeries, ApexOptions } from 'apexcharts';

	let {
		series,
		exibir = true,
	}: {
		series: ApexAxisChartSeries;
		exibir?: boolean;
	} = $props();

	let elemento = $state<HTMLDivElement>();

	const opcoes: ApexOptions = {
		chart: {
			type: 'heatmap',
			height: 600,
			id: 'heatmap',
		},

		dataLabels: {
			enabled: false,
		},

		xaxis: {
			title: {
				text: 'Média longa',
			},
		},

		yaxis: {
			title: {
				text: 'Média curta',
			},
		},

		tooltip: {
			y: {
				formatter(value: number) {
					return value.toFixed(2);
				},
			},
		},

		legend: {
			show: false,
		},
	};

	$effect(() => {
		if (!exibir || !elemento) return;

		void series;

		let cancelado = false;
		let instancia: ApexCharts | undefined;

		(async () => {
			const apex = await import('apexcharts');

			if (cancelado || !elemento) return;

			const valores = series.flatMap((serie) =>
				(serie.data as { x: string; y: number }[]).map((p) => p.y),
			);

			const minimo = Math.min(...valores);
			const maximo = Math.max(...valores);

			const amplitude = Math.max(Math.abs(minimo), Math.abs(maximo));

			type Range = {
				from: number;
				to: number;
				color: string;
			};

			const ranges: Range[] = [];

			const faixas = 10;

			// Vermelhos
			for (let i = 0; i < faixas; i++) {
				ranges.push({
					from: -amplitude + (amplitude * i) / faixas,
					to: -amplitude + (amplitude * (i + 1)) / faixas,
					color: `hsl(0,80%,${25 + i * 4}%)`,
				});
			}

			// Verdes
			for (let i = 0; i < faixas; i++) {
				ranges.push({
					from: (amplitude * i) / faixas,
					to: (amplitude * (i + 1)) / faixas,
					color: `hsl(120,70%,${70 - i * 4}%)`,
				});
			}

			instancia = new apex.default(elemento, {
				...opcoes,

				series,

				plotOptions: {
					heatmap: {
						enableShades: false,
						radius: 0,
						colorScale: {
							ranges,
						},
					},
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
