import { funcaoCalcularTrades } from '$lib/apexcharts/funcoes/funcaoCalcularTrades';
import { funcaoExtrairLucroDeTrades } from '$lib/apexcharts/funcoes/funcaoExtrairLucroDeTrades';
import { estados } from './estados.svelte';
import { funcaoAtivos } from './funcoesParaDeriveds/funcaoAtivos.svelte';
import { funcaoMediasMoveis } from './funcoesParaDeriveds/funcaoMediasMoveis';
import { funcaoPromessaDeDadosDoYahooFinance } from './funcoesParaDeriveds/funcaoPromessaDeDadosDoYahooFinance.svelte';
import { funcaoVelas } from './funcoesParaDeriveds/funcaoVelas.svelte';

class Deriveds {
	ativos = $derived(funcaoAtivos({ estados }));
	promessaDeDadosDoYahooFinance = $derived(funcaoPromessaDeDadosDoYahooFinance({ estados }));
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
