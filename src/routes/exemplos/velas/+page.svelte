<script lang="ts">
	import GraficoDeVelas from '$lib/apexcharts/componentes/GraficoDeVelas.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<GraficoDeVelas velas={data.velas} exibir={true} />
