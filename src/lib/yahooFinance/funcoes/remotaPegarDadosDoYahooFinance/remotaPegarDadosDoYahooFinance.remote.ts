import { query } from '$app/server';
import { funcaoPegarDadosDoYahooFinance } from './funcaoPegarDadosDoYahooFinance.server';
import { schema } from './schema';

export const remotaPegarDadosDoYahooFinance = query(schema, funcaoPegarDadosDoYahooFinance);
