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
	let grafico = $state<ApexCharts>();

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

		let cancelado = false;
		let instancia: ApexCharts | undefined;

		async function funcaoAssincronaCriarGrafico() {
			const apex = await import('apexcharts');

			if (cancelado || !elemento) return;

			instancia = new apex.default(elemento, opcoes);
			grafico = instancia;
			await instancia.render();
		}

		funcaoAssincronaCriarGrafico();

		return () => {
			cancelado = true;

			if (instancia) {
				instancia.destroy();
			}

			if (grafico === instancia) {
				grafico = undefined;
			}
		};
	});

	$effect(() => {
		if (grafico) {
			const arraySeries: ApexCharts.ApexOptions['series'] = [];
			arraySeries[0] = {
				data: velas,
				type: 'candlestick',
				name: 'COTAÇÕES',
				color: 'black',
			};
			for (let i = 1; i < linhas.length + 1; i++) {
				arraySeries[i] = {
					type: 'line',
					name: linhas[i - 1].opcoes.descricao,
					data: linhas[i - 1].dados,
					color: linhas[i - 1].opcoes.cor,
				};
			}

			grafico.updateOptions({
				stroke: {
					width: [2, ...linhas.map(() => 2)],
					dashArray: [0, ...linhas.map(() => 5)],
				},
			});

			grafico.updateSeries(arraySeries);
		}
	});

	$effect(() => {
		if (trades !== undefined) {
			type typeApexAnnotations = Exclude<ApexCharts.ApexOptions['annotations'], undefined>;
			type typeApexXaxis = Exclude<typeApexAnnotations['xaxis'], undefined>;

			if (grafico) {
				grafico.clearAnnotations();
			}
			trades.forEach((tradeCorrente) => {
				const stringColor =
					tradeCorrente.enumGanhoOuPerda === 'enumGanho'
						? cores.verde
						: tradeCorrente.enumGanhoOuPerda === 'enumPerda'
							? cores.vermelho
							: cores.amarelo;
				const objectXAxisAnnotation: typeApexXaxis[number] = {
					x: tradeCorrente.dataDaCompra.getTime().toString(),
					x2: tradeCorrente.dataDaVenda.getTime().toString(),
					fillColor: stringColor,
					opacity: 0.4,
					label: {
						borderColor: stringColor,
						style: {
							fontSize: '10px',
							color: stringColor === cores.vermelho ? cores.branco : cores.preto,
							background: stringColor,
						},
						offsetY: -10,
						text: `${tradeCorrente.duracao} (${tradeCorrente.fatorDeLucro > 1 ? ((tradeCorrente.fatorDeLucro - 1) * 100).toFixed(2) : ((tradeCorrente.fatorDeLucro - 1) * 100).toFixed(2)})`,
					},
				};
				if (grafico) {
					grafico.addXaxisAnnotation(objectXAxisAnnotation);
				}
			});
		}
	});
</script>

{#if exibir}
	<div bind:this={elemento} style="width:100%;"></div>
{/if}
