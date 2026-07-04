import type { tipoAtivo } from '../../tipos/tipoAtivo';

export const brasil: tipoAtivo[] = [
	// --- SETOR FINANCEIRO ---
	{ ticker: 'ITUB4.SA', nome: 'Itaú Unibanco (ITUB4)' },
	{ ticker: 'BBDC4.SA', nome: 'Bradesco (BBDC4)' },
	{ ticker: 'BBAS3.SA', nome: 'Banco do Brasil (BBAS3)' },
	{ ticker: 'SANB11.SA', nome: 'Santander Brasil (SANB11)' },
	{ ticker: 'BPAC11.SA', nome: 'BTG Pactual (BPAC11)' },
	{ ticker: 'ITSA4.SA', nome: 'Itaúsa (ITSA4)' },
	{ ticker: 'BBSE3.SA', nome: 'BB Seguridade (BBSE3)' },
	{ ticker: 'CXSE3.SA', nome: 'Caixa Seguridade (CXSE3)' },
	{ ticker: 'PSSA3.SA', nome: 'Porto Seguro (PSSA3)' },

	// --- ENERGIA E SANEAMENTO ---
	{ ticker: 'ELET3.SA', nome: 'Eletrobras (ELET3)' },
	{ ticker: 'CMIG4.SA', nome: 'Cemig (CMIG4)' },
	{ ticker: 'CPLE6.SA', nome: 'Copel (CPLE6)' },
	{ ticker: 'EGIE3.SA', nome: 'Engie Brasil (EGIE3)' },
	{ ticker: 'TRPL4.SA', nome: 'ISA CTEEP (TRPL4)' },
	{ ticker: 'TAEE11.SA', nome: 'Taesa (TAEE11)' },
	{ ticker: 'EQTL3.SA', nome: 'Equatorial Energia (EQTL3)' },
	{ ticker: 'AURE3.SA', nome: 'Auren Energia (AURE3)' },
	{ ticker: 'SBSP3.SA', nome: 'Sabesp (SBSP3)' },
	{ ticker: 'SAPR11.SA', nome: 'Sanepar (SAPR11)' },

	// --- COMMODITIES E INDÚSTRIA PESADA ---
	{ ticker: 'VALE3.SA', nome: 'Vale (VALE3)' },
	{ ticker: 'PETR4.SA', nome: 'Petrobras Pref. (PETR4)' },
	{ ticker: 'PETR3.SA', nome: 'Petrobras Ord. (PETR3)' },
	{ ticker: 'PRIO3.SA', nome: 'Prio (PRIO3)' },
	{ ticker: 'RECV3.SA', nome: 'PetroReconcavo (RECV3)' },
	{ ticker: 'GGBR4.SA', nome: 'Gerdau (GGBR4)' },
	{ ticker: 'CSNA3.SA', nome: 'Siderúrgica Nacional (CSNA3)' },
	{ ticker: 'USIM5.SA', nome: 'Usiminas (USIM5)' },
	{ ticker: 'SUZB3.SA', nome: 'Suzano (SUZB3)' },
	{ ticker: 'KLBN11.SA', nome: 'Klabin (KLBN11)' },

	// --- CONSUMO E VAREJO ---
	{ ticker: 'MGLU3.SA', nome: 'Magazine Luiza (MGLU3)' },
	{ ticker: 'BHIA3.SA', nome: 'Casas Bahia (BHIA3)' },
	{ ticker: 'LREN3.SA', nome: 'Lojas Renner (LREN3)' },
	{ ticker: 'CRFB3.SA', nome: 'Carrefour Brasil (CRFB3)' },
	{ ticker: 'ASAI3.SA', nome: 'Assaí Atacadista (ASAI3)' },
	{ ticker: 'AREZ3.SA', nome: 'Arezzo (AREZ3)' },
	{ ticker: 'ALPA4.SA', nome: 'Alpargatas (ALPA4)' },
	{ ticker: 'NTCO3.SA', nome: 'Natura &Co (NTCO3)' },

	// --- AGRONEGÓCIO E ALIMENTOS ---
	{ ticker: 'JBSS3.SA', nome: 'JBS (JBSS3)' },
	{ ticker: 'BRFS3.SA', nome: 'BRF (BRFS3)' },
	{ ticker: 'MRFG3.SA', nome: 'Marfrig (MRFG3)' },
	{ ticker: 'BEEF3.SA', nome: 'Minerva Foods (BEEF3)' },
	{ ticker: 'SLCE3.SA', nome: 'SLC Agrícola (SLCE3)' },
	{ ticker: 'RAIZ4.SA', nome: 'Raízen (RAIZ4)' },
	{ ticker: 'SMTO3.SA', nome: 'São Martinho (SMTO3)' },

	// --- LOGÍSTICA E TRANSPORTE ---
	{ ticker: 'WEGE3.SA', nome: 'WEG (WEGE3)' },
	{ ticker: 'RENT3.SA', nome: 'Localiza (RENT3)' },
	{ ticker: 'MOVI3.SA', nome: 'Movida (MOVI3)' },
	{ ticker: 'RAIL3.SA', nome: 'Rumo Logística (RAIL3)' },
	{ ticker: 'CCRO3.SA', nome: 'CCR (CCRO3)' },
	{ ticker: 'AZUL4.SA', nome: 'Azul Linhas Aéreas (AZUL4)' },
	{ ticker: 'STBP3.SA', nome: 'Santos Brasil (STBP3)' },

	// --- SAÚDE ---
	{ ticker: 'RADL3.SA', nome: 'Raia Drogasil (RADL3)' },
	{ ticker: 'HAPV3.SA', nome: 'Hapvida (HAPV3)' },
	{ ticker: 'RDOR3.SA', nome: "Rede D'Or (RDOR3)" },
	{ ticker: 'FLRY3.SA', nome: 'Fleury (FLRY3)' },

	// --- FUNDOS IMOBILIÁRIOS (FIIs) ---
	{ ticker: 'MXRF11.SA', nome: 'FII Maxi Renda (MXRF11)' },
	{ ticker: 'HGLG11.SA', nome: 'FII CSHG Logística (HGLG11)' },
	{ ticker: 'XPLG11.SA', nome: 'FII XP Logística (XPLG11)' },
	{ ticker: 'KNCR11.SA', nome: 'FII Kinea Rendimentos (KNCR11)' },
	{ ticker: 'HGRU11.SA', nome: 'FII CSHG Renda Urbana (HGRU11)' },
	{ ticker: 'VISC11.SA', nome: 'FII Vinci Shopping (VISC11)' },
	{ ticker: 'BTLG11.SA', nome: 'FII BTG Logística (BTLG11)' },
];
