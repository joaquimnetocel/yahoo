import * as v from 'valibot';
import { constIntervalosDoYahooFinance } from '../../constantes/constIntervalosDoYahooFinance';

export const schema = v.object({
	simbolo: v.pipe(v.string(), v.trim(), v.minLength(1)),
	intervalo: v.optional(v.picklist(constIntervalosDoYahooFinance)),
	fim: v.optional(v.date()),
	periodos: v.pipe(v.number(), v.integer(), v.minValue(1)),
});
