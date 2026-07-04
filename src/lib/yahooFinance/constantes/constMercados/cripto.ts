import type { tipoAtivo } from '../../tipos/tipoAtivo';

export const cripto: tipoAtivo[] = [
	// --- MAIORES POR CAPITALIZAÇÃO (BLUE CHIPS) ---
	{ ticker: 'BTC-USD', nome: 'Bitcoin (BTC)' },
	{ ticker: 'ETH-USD', nome: 'Ethereum (ETH)' },
	{ ticker: 'BNB-USD', nome: 'BNB (BNB)' },
	{ ticker: 'SOL-USD', nome: 'Solana (SOL)' },
	{ ticker: 'XRP-USD', nome: 'Ripple (XRP)' },

	// --- SMART CONTRACTS E LAYER 1s ---
	{ ticker: 'ADA-USD', nome: 'Cardano (ADA)' },
	{ ticker: 'DOT-USD', nome: 'Polkadot (DOT)' },
	{ ticker: 'AVAX-USD', nome: 'Avalanche (AVAX)' },
	{ ticker: 'NEAR-USD', nome: 'NEAR Protocol (NEAR)' },
	{ ticker: 'SUI-USD', nome: 'Sui (SUI)' },
	{ ticker: 'APT-USD', nome: 'Aptos (APT)' },
	{ ticker: 'ALGO-USD', nome: 'Algorand (ALGO)' },

	// --- LAYER 2s E ESCALABILIDADE ---
	{ ticker: 'MATIC-USD', nome: 'Polygon (MATIC)' },
	{ ticker: 'OP-USD', nome: 'Optimism (OP)' },
	{ ticker: 'ARB-USD', nome: 'Arbitrum (ARB)' },

	// --- DEFI E ORÁCULOS ---
	{ ticker: 'LINK-USD', nome: 'Chainlink (LINK)' },
	{ ticker: 'UNI-USD', nome: 'Uniswap (UNI)' },
	{ ticker: 'AAVE-USD', nome: 'Aave (AAVE)' },
	{ ticker: 'MKR-USD', nome: 'Maker (MKR)' },

	// --- MEMECOINS (ALTA VOLATILIDADE) ---
	{ ticker: 'DOGE-USD', nome: 'Dogecoin (DOGE)' },
	{ ticker: 'SHIB-USD', nome: 'Shiba Inu (SHIB)' },
	{ ticker: 'PEPE-USD', nome: 'Pepe (PEPE)' },
	{ ticker: 'WIF-USD', nome: 'dogwifhat (WIF)' },

	// --- OUTROS ECOSSISTEMAS E UTILITÁRIOS ---
	{ ticker: 'LTC-USD', nome: 'Litecoin (LTC)' },
	{ ticker: 'STX-USD', nome: 'Stacks (STX)' },
	{ ticker: 'ATOM-USD', nome: 'Cosmos (ATOM)' },
	{ ticker: 'ICP-USD', nome: 'Internet Computer (ICP)' },
];
