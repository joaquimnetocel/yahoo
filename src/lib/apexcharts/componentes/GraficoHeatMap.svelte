<script lang="ts">
	import type ApexCharts from 'apexcharts';
	import type { ApexOptions } from 'apexcharts';
	import type { tipoHeatmapDoApexcharts } from '../tipos/tipoHeatmapDoApexcharts';

	let {
		series,
		exibir = true,
	}: {
		series: tipoHeatmapDoApexcharts[];
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
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				if (!w?.config?.series?.[seriesIndex]) return '';

				const serieAtual = w.config.series[seriesIndex];

				// 1. Remove a possibilidade de ser 'number'.
				// O TS entende isso e passa a tratar 'serieAtual' estritamente como o objeto da série.
				if (typeof serieAtual === 'number') return '';

				// O 'name' ainda pode ser undefined pela tipagem, então usamos o operador ?? para garantir um fallback
				const mediaCurta = serieAtual.name ?? `Série ${seriesIndex}`;

				const ponto = serieAtual.data?.[dataPointIndex];
				if (!ponto) return '';

				// 2. Fazemos o mesmo cuidado com o ponto, já que ele também vem de uma união de tipos complexa
				let mediaLonga = dataPointIndex;
				if (typeof ponto === 'object' && ponto !== null && 'x' in ponto) {
					mediaLonga = ponto.x;
				}

				const valor = series[seriesIndex][dataPointIndex];

				return `
            <div class="apexcharts-tooltip-title" style="padding: 6px 10px; font-weight: bold;">
                Cruzamento de Médias
            </div>
            <div class="apexcharts-tooltip-series-group apexcharts-active" style="padding: 8px 10px; display: flex; flex-direction: column; gap: 4px;">
                <div><strong>Média Curta (Y):</strong> ${mediaCurta}</div>
                <div><strong>Média Longa (X):</strong> ${mediaLonga}</div>
                <div><strong>Valor:</strong> ${valor.toFixed(2)}</div>
            </div>
        `;
			},
		},

		legend: {
			show: true,
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
