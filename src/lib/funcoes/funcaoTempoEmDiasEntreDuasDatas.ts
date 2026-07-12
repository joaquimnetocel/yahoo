function funcaoTransformarMilisegundosEmDias({
	milisegundos,
	precisao,
}: {
	milisegundos: number;
	precisao?: number;
}): number {
	const dias = milisegundos / (1000 * 60 * 60 * 24);

	if (precisao === undefined) {
		return dias;
	}
	return Number(dias.toFixed(precisao));
}

export function funcaoTempoEmDiasEntreDuasDatas({
	dataFinal,
	dataInicial,
	precisao,
}: {
	dataInicial: Date;
	dataFinal: Date;
	precisao?: number;
}) {
	return funcaoTransformarMilisegundosEmDias({
		milisegundos: dataFinal.getTime() - dataInicial.getTime(),
		precisao,
	});
}
