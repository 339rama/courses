import { BooleanResponse } from '../dto/BooleanResponse';

export const booleanResponse = (result: boolean = true): BooleanResponse => ({ result });
