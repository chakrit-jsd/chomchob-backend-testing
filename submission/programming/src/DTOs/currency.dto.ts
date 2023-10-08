import { ICurrency } from "../models/Currency.model";

export interface AddCurrencyDTO extends Pick<ICurrency, 'name' | 'symbol' | 'dollarPrice'> {
  amount?: number;
}

export interface UpdateCurrencyDTO extends Partial<AddCurrencyDTO> {
  id: number;
}
