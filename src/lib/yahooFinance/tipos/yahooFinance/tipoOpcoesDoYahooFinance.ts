import type YahooFinance from 'yahoo-finance2';

type tipoYahooFinance = InstanceType<typeof YahooFinance>;

export type tipoOpcoesDoYahooFinance = Parameters<tipoYahooFinance['chart']>[1];
