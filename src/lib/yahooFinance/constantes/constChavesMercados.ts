import type { tipoMercados } from '../tipos/tipoMercados';
import { constMercados } from './constMercados';

export const constChavesMercados = Object.keys(constMercados) as Array<keyof tipoMercados>;
