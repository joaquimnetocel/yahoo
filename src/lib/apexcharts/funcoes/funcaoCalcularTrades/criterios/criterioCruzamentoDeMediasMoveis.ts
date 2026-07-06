import type { tipoPontoDoApexCharts } from '$lib/apexcharts/tipos/tipoPontoDoApexcharts';
import type { tipoVelaDoApexcharts } from '$lib/apexcharts/tipos/tipoVelaDoApexcharts';

const funcaoPossiveisPontosDeCompra = function ({
	velas,
	linhas,
}: {
	velas: tipoVelaDoApexcharts[];
	linhas: tipoPontoDoApexCharts[][];
}): tipoPontoDoApexCharts[] {
	return velas.map((velaCorrente, contador): tipoPontoDoApexCharts => {
		const mediaMovelCurtaCorrente = linhas[0][contador].y;
		const mediaMovelLongaCorrente = linhas[1][contador].y;

		if (mediaMovelCurtaCorrente === null || mediaMovelLongaCorrente === null) {
			return {
				x: velaCorrente.x,
				y: null,
			};
		}
		if (mediaMovelLongaCorrente < mediaMovelCurtaCorrente) {
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
	linhas: tipoPontoDoApexCharts[][];
}): tipoPontoDoApexCharts[] {
	return velas.map((velaCorrente, contador): tipoPontoDoApexCharts => {
		const mediaMovelCurtaCorrente = linhas[0][contador].y;
		const mediaMovelLongaCorrente = linhas[1][contador].y;
		if (mediaMovelCurtaCorrente === null || mediaMovelLongaCorrente === null) {
			return {
				x: velaCorrente.x,
				y: null,
			};
		}
		if (mediaMovelCurtaCorrente < mediaMovelLongaCorrente) {
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
};
