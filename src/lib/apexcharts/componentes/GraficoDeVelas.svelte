<script lang="ts">
	import { cores } from '$lib/apexcharts/cores';
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';
	import type { tipoTrade } from '$lib/tipos/tipoTrade';
	import type ApexCharts from 'apexcharts';

	let {
		velas,
		linhas = [],
		trades = [],
		exibir = true,
	}: {
		velas: tipoVelaDoApexcharts[];
		linhas?: tipoLinhaDoApexCharts[];
		trades?: tipoTrade[];
		exibir?: boolean;
	} = $props();

	let elemento = $state<HTMLDivElement>();

	const opcoes: ApexCharts.ApexOptions = {
		series: [],
		chart: {
			type: 'candlestick',
			height: 350,
			// group: 'social', // PROMOVE A SINCRONIA COM OUTROS GRÁFICOS, MAS PERDE A CAPACIDADE DE DAR ZOOM
			id: 'candles',
		},
		stroke: {
			width: [2],
			dashArray: [0], // candlestick (0 = sólido), linha (5 = tracejada)
		},
		// title: {
		// 	text: 'CandleStick Chart',
		// 	align: 'left',
		// },
		xaxis: {
			type: 'datetime',
			tickPlacement: 'on',
			labels: {
				datetimeUTC: false, // <- Isso impede a conversão para horário local
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
			labels: {
				formatter: function (value: number | null) {
					if (value !== null) {
						return value.toFixed(2);
					}
					return (0).toFixed(2);
				},
			},
		},
	};

	$effect(() => {
		if (!exibir || !elemento) return;

		void velas;
		void linhas;
		void trades;

		let cancelado = false;
		let instancia: ApexCharts | undefined;

		(async () => {
			const apex = await import('apexcharts');

			if (cancelado || !elemento) return;

			const series: ApexCharts.ApexAxisChartSeries = [
				{
					name: 'COTAÇÕES',
					type: 'candlestick',
					data: velas,
				},
				...linhas.map((linha) => ({
					name: linha.opcoes.descricao,
					type: 'line' as const,
					data: linha.pontos,
					color: linha.opcoes.cor,
				})),
			];

			instancia = new apex.default(elemento, {
				...opcoes,
				series,

				stroke: {
					width: [2, ...linhas.map(() => 2)],
					dashArray: [0, ...linhas.map(() => 5)],
				},
			});

			await instancia.render();

			for (const trade of trades) {
				const cor =
					trade.enumGanhoOuPerda === 'enumGanho'
						? cores.verde
						: trade.enumGanhoOuPerda === 'enumPerda'
							? cores.vermelho
							: cores.amarelo;

				instancia.addXaxisAnnotation({
					x: trade.dataDaCompra.getTime(),
					x2: trade.dataDaVenda.getTime(),
					fillColor: cor,
					opacity: 0.4,
					label: {
						borderColor: cor,
						offsetY: -10,
						style: {
							fontSize: '10px',
							background: cor,
							color: cor === cores.vermelho ? cores.branco : cores.preto,
						},
						text: `${trade.duracao} (${((trade.fatorDeLucro - 1) * 100).toFixed(2)}%)`,
					},
				});
			}
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
