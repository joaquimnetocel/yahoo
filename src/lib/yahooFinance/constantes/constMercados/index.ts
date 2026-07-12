import type { tipoMercados } from '$lib/yahooFinance/tipos/tipoMercados';
import { brasil } from './brasil';
import { cripto } from './cripto';
import { eua } from './eua';

export const constMercados: tipoMercados = {
	cripto: {
		titulo: 'CRIPTOMOEDAS',
		ativos: cripto,
	},
	brasil: {
		titulo: 'BRASILEIRO',
		ativos: brasil,
	},
	eua: {
		titulo: 'AMERICANO',
		ativos: eua,
	},
};
