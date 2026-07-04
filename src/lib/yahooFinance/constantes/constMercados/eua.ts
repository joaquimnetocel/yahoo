import type { tipoAtivo } from '../../tipos/tipoAtivo';

export const eua: tipoAtivo[] = [
	// --- BIG TECHS (TECNOLOGIA) ---
	{ ticker: 'AAPL', nome: 'Apple (AAPL)' },
	{ ticker: 'MSFT', nome: 'Microsoft (MSFT)' },
	{ ticker: 'NVDA', nome: 'NVIDIA (NVDA)' },
	{ ticker: 'GOOGL', nome: 'Alphabet/Google (GOOGL)' },
	{ ticker: 'AMZN', nome: 'Amazon (AMZN)' },
	{ ticker: 'META', nome: 'Meta/Facebook (META)' },
	{ ticker: 'TSLA', nome: 'Tesla (TSLA)' },
	{ ticker: 'NFLX', nome: 'Netflix (NFLX)' },
	{ ticker: 'AVGO', nome: 'Broadcom (AVGO)' },
	{ ticker: 'AMD', nome: 'Advanced Micro Devices (AMD)' },

	// --- FINANÇAS E BANCOS ---
	{ ticker: 'JPM', nome: 'JPMorgan Chase (JPM)' },
	{ ticker: 'BAC', nome: 'Bank of America (BAC)' },
	{ ticker: 'WFC', nome: 'Wells Fargo (WFC)' },
	{ ticker: 'MS', nome: 'Morgan Stanley (MS)' },
	{ ticker: 'GS', nome: 'Goldman Sachs (GS)' },
	{ ticker: 'V', nome: 'Visa (V)' },
	{ ticker: 'MA', nome: 'Mastercard (MA)' },
	{ ticker: 'AXP', nome: 'American Express (AXP)' },

	// --- CONSUMO E INDÚSTRIA ---
	{ ticker: 'WMT', nome: 'Walmart (WMT)' },
	{ ticker: 'KO', nome: 'Coca-Cola (KO)' },
	{ ticker: 'PEP', nome: 'PepsiCo (PEP)' },
	{ ticker: 'COST', nome: 'Costco (COST)' },
	{ ticker: 'SBUX', nome: 'Starbucks (SBUX)' },
	{ ticker: 'NKE', nome: 'Nike (NKE)' },
	{ ticker: 'DIS', nome: 'Walt Disney (DIS)' },
	{ ticker: 'HD', nome: 'Home Depot (HD)' },
	{ ticker: 'CAT', nome: 'Caterpillar (CAT)' },
	{ ticker: 'GE', nome: 'General Electric (GE)' },

	// --- SAÚDE E FARMACÊUTICAS ---
	{ ticker: 'LLY', nome: 'Eli Lilly (LLY)' },
	{ ticker: 'JNJ', nome: 'Johnson & Johnson (JNJ)' },
	{ ticker: 'UNH', nome: 'UnitedHealth Group (UNH)' },
	{ ticker: 'MRK', nome: 'Merck & Co. (MRK)' },
	{ ticker: 'PFE', nome: 'Pfizer (PFE)' },
	{ ticker: 'ABV', nome: 'AbbVie (ABV)' },

	// --- ENERGIA ---
	{ ticker: 'XOM', nome: 'Exxon Mobil (XOM)' },
	{ ticker: 'CVX', nome: 'Chevron (CVX)' },

	// --- PRINCIPAIS ETFS (ÍNDICES) ---
	{ ticker: 'SPY', nome: 'ETF S&P 500 (SPY)' },
	{ ticker: 'QQQ', nome: 'ETF Nasdaq 100 (QQQ)' },
	{ ticker: 'DIA', nome: 'ETF Dow Jones (DIA)' },
	{ ticker: 'VNQ', nome: 'ETF Real Estate / REITs (VNQ)' },
];
