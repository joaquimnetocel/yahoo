import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
import { funcaoExtrairLucroDeTrades } from '$lib/apexcharts/funcoes/funcaoExtrairLucroDeTrades';
import { funcaoAtivosDeUmMercado } from '$lib/yahooFinance/funcoes/funcaoAtivosDeUmMercado.svelte';
import { remotaPegarDadosDoYahooFinance } from '$lib/yahooFinance/funcoes/remotaPegarDadosDoYahooFinance/remotaPegarDadosDoYahooFinance.remote';
import { estados } from './estados.svelte';
import { funcaoMediasMoveis } from './funcoesParaDeriveds/funcaoMediasMoveis';
import { funcaoVelas } from './funcoesParaDeriveds/funcaoVelas.svelte';

class Deriveds {
	ativos = $derived(funcaoAtivosDeUmMercado({ mercado: estados.mercado }));
	promessaDeDadosDoYahooFinance = $derived(
		remotaPegarDadosDoYahooFinance({
			periodos: Number(estados.periodos),
			simbolo: estados.simbolo,
			intervalo: estados.intervalo,
		}),
	);
	velas = $derived(
		funcaoVelas({
			promessa: this.promessaDeDadosDoYahooFinance,
		}),
	);
	mediasMoveis = $derived(
		funcaoMediasMoveis({
			estados,
			velas: this.velas,
		}),
	);
	linhas = $derived([...this.mediasMoveis]);
	trades = $derived(
		funcaoCalcularTrades({
			velas: this.velas,
			linhas: this.linhas,
		}),
	);
	lucro = $derived(
		funcaoExtrairLucroDeTrades({
			trades: this.trades,
		}),
	);
}

export const deriveds = new Deriveds();
