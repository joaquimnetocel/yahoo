<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
	import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

	let {
		simbolo,
		periodosParaMediasMoveisSimples = [],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		periodosParaMediasMoveisExponenciais = [],
		velas,
	}: {
		simbolo: string;
		periodosParaMediasMoveisSimples?: number[];
		periodosParaMediasMoveisExponenciais?: number[];
		velas: tipoVelaDoApexcharts[];
	} = $props();

	const mediasMoveisSimples = $derived(
		funcaoLinhasDeMediasMoveis({
			periodos: periodosParaMediasMoveisSimples,
			tipo: 'simples',
			velas,
		}),
	);

	// const mediasMoveisExponenciais = $derived(
	// 	funcaoLinhasDeMediasMoveis({
	// 		periodos: periodosParaMediasMoveisExponenciais,
	// 		tipo: 'exponencial',
	// 		velas,
	// 	}),
	// );

	const linhas = $derived([...mediasMoveisSimples]);
</script>

<h2 class="text-lg font-bold mb-2">EXIBINDO GRÁFICO DE: {simbolo}</h2>
<GraficoDeVelas {velas} exibir={true} {linhas} />
