import type { tipoLinhaDoApexCharts } from '$lib/apexcharts/tipos/tipoLinhaDoApexcharts';
import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

const funcaoPossiveisPontosDeCompra = function ({
	velas,
	linhas,
}: {
	velas: tipoVelaDoApexcharts[];
	linhas: tipoLinhaDoApexCharts[];
}): tipoPontoDoApexCharts[] {
	return velas.map((velaCorrente, contador): tipoPontoDoApexCharts => {
		const rsi = linhas[0].pontos[contador].y;

		if (rsi === null) {
			return {
				x: velaCorrente.x,
				y: null,
			};
		}
		if (rsi < 30) {
			return {
				x: velaCorrente.x,
				y: velaCorrente.y[3], // 3 É O PREÇO DE FECHAMENTO DA VELA
			};
		}
		return {
			x: velaCorrente.x,
			y: null,
		};
	});
};

const funcaoPossiveisPontosDeVenda = function ({
	velas,
	linhas,
}: {
	velas: tipoVelaDoApexcharts[];
	linhas: tipoLinhaDoApexCharts[];
}): tipoPontoDoApexCharts[] {
	return velas.map((velaCorrente, contador): tipoPontoDoApexCharts => {
		const rsi = linhas[1].pontos[contador].y;
		if (rsi === null) {
			return {
				x: velaCorrente.x,
				y: null,
			};
		}
		if (rsi > 80) {
			return {
				x: velaCorrente.x,
				y: velaCorrente.y[3], // 3 É O FECHAMENTO DA VELA
			};
		}
		return {
			x: velaCorrente.x,
			y: null,
		};
	});
};

export const criterio = {
	funcaoPossiveisPontosDeCompra,
	funcaoPossiveisPontosDeVenda,
	stop: undefined,
	minimoDeLinhas: 2,
};
