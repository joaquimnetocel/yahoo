<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoCriarMediaMovelParaApexcharts } from '$lib/apexcharts/funcoes/funcaoCriarMediaMovelParaApexcharts';
	import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
	import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

	let {
		simbolo,
		periodosParaMediasMoveisSimples = [],
		velas,
		// periodosParaMediasMoveisExponenciais = [],
	}: {
		simbolo: string;
		periodosParaMediasMoveisSimples?: number[];
		velas: tipoVelaDoApexcharts[];
		// periodosParaMediasMoveisExponenciais?: number[];
	} = $props();

	const mediasMoveisSimples: tipoLinhaDoApexCharts[] = $derived.by(() => {
		return periodosParaMediasMoveisSimples.map((periodo) => {
			const pontosDoApexcharts: tipoPontoDoApexCharts[] = funcaoCriarMediaMovelParaApexcharts({
				velas,
				periodo,
			});
			const linhaDoApexcharts: tipoLinhaDoApexCharts = {
				opcoes: {
					descricao: `MÉDIA MÓVEL SIMPLES (${periodo})`,
					cor: 'blue',
				},
				dados: pontosDoApexcharts,
			};
			return linhaDoApexcharts;
		});
	});

	// $effect(() => {
	// 	if (promessa.ready) {
	// 		quantidadeDeVelas = velas.length;
	// 	}
	// });
</script>

<h2 class="text-lg font-bold mb-2">EXIBINDO GRÁFICO DE: {simbolo}</h2>
<GraficoDeVelas {velas} exibir={true} linhas={mediasMoveisSimples} />
