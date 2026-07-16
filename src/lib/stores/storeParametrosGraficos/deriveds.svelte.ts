import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
import { funcaoLinhasDeAdx } from '$lib/apexcharts/funcoes/funcaoLinhasDeAdx';
import { funcaoLinhasDeMediasMoveis } from '$lib/apexcharts/funcoes/funcaoLinhasDeMediasMoveis';
import { funcaoLinhasDeRsis } from '$lib/apexcharts/funcoes/funcaoLinhasDeRsi';
import { funcaoCalcularDuracaoEmDiasDeTrades } from '$lib/funcoes/funcaoCalcularDuracaoEmDiasDeTrades';
import { funcaoCalcularLucroDeTrades } from '$lib/funcoes/funcaoCalcularLucroDeTrades';
import { funcaoTransformarParaLucroMensal } from '$lib/funcoes/funcaoTransformarParaLucroMensal';
import { funcaoAtivosDeUmMercado } from '$lib/yahooFinance/funcoes/funcaoAtivosDeUmMercado.svelte';
import { funcaoConverterDeYahooFinanceParaApexchart } from '$lib/yahooFinance/funcoes/funcaoConverterDeYahooFinanceParaApexchart';
import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
import { estados } from './estados.svelte';

class classeDeriveds {
	ativos = $derived(funcaoAtivosDeUmMercado({ mercado: estados.mercado }));
	promessaDeDadosDoYahooFinance = $derived(
		remotaPegarDadosDoYahooFinance({
			periodos: Number(estados.periodos),
			simbolo: estados.simbolo,
			intervalo: estados.intervalo,
		}),
	);
	velas = $derived.by(() => {
		if (this.promessaDeDadosDoYahooFinance.ready) {
			return funcaoConverterDeYahooFinanceParaApexchart(this.promessaDeDadosDoYahooFinance.current);
		}
		return [];
	});
	linhasDeMediasMoveis = $derived(
		funcaoLinhasDeMediasMoveis({
			periodos: estados.periodosParaMediasMoveis,
			tipo: estados.tipoDeMediaMovel,
			velas: this.velas,
		}),
	);
	linhasDeRsis = $derived(
		funcaoLinhasDeRsis({
			periodos: estados.periodosParaRsis,
			velas: this.velas,
		}),
	);
	adxs = $derived(
		funcaoLinhasDeAdx({
			periodos: estados.periodosParaAdx,
			velas: this.velas,
		}),
	);
	linhasDoAdx = $derived(this.adxs.map((aux) => aux.linhaDoAdx));
	linhasDoPdi = $derived(this.adxs.map((aux) => aux.linhaDoPdi));
	linhasDoMdi = $derived(this.adxs.map((aux) => aux.linhaDoMdi));
	linhas = $derived([...this.linhasDeMediasMoveis]);
	trades = $derived(
		funcaoCalcularTrades({
			velas: this.velas,
			linhas: this.linhas,
		}),
	);
	lucro = $derived(
		funcaoCalcularLucroDeTrades({
			trades: this.trades,
		}),
	);
	dias = $derived(
		funcaoCalcularDuracaoEmDiasDeTrades({
			trades: this.trades,
		}),
	);
	lucroMensal = $derived(
		funcaoTransformarParaLucroMensal({
			dias: this.dias,
			lucro: this.lucro,
		}),
	);
}

export const deriveds = new classeDeriveds();
