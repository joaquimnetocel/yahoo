import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';
import { brasil } from './brasil';
import { cripto } from './cripto';
import { eua } from './eua';

export const constMercados: tipoMercados = {
	brasil: {
		titulo: 'BRASILEIRO',
		ativos: brasil,
	},
	eua: {
		titulo: 'AMERICANO',
		ativos: eua,
	},
	cripto: {
		titulo: 'CRIPTOMOEDAS',
		ativos: cripto,
	},
};
