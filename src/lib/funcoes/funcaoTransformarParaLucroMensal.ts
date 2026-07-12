export function funcaoTransformarParaLucroMensal({ lucro, dias }: { lucro: number; dias: number }) {
	const fatorDeLucro = lucro / 100 + 1;
	const fatorDeLucroMensal = Math.pow(fatorDeLucro, 30 / dias);
	return (fatorDeLucroMensal - 1) * 100;
}
