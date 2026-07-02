import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();

export type tipoOpcoesDoYahooFinance = Parameters<typeof yf.chart>[1];
