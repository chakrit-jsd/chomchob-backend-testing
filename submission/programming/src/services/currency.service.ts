import { AddCurrencyDTO, UpdateCurrencyDTO } from '../DTOs/currency.dto';
import { Currency } from './../models/Currency.model';
import { createNewExchange } from './exchange.service';

export const addCurrency = async (data: AddCurrencyDTO) => {
  try {
    const curr = await Currency.create({
      name: data.name,
      symbol: data.symbol,
      dollarPrice: data.dollarPrice,
    })
    await createNewExchange(curr.id)
    return curr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export const updateCurrency = async (data: UpdateCurrencyDTO) => {
  try {
    const curr = await Currency.findByPk(data.id)
    if (!curr) throw 'currency not found'

    curr.name = data.name || curr.name
    curr.symbol = data.symbol || curr.symbol
    curr.dollarPrice = data.dollarPrice || curr.dollarPrice
    const res = await curr.save()

    return res
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export const deleteCurrency = async (id: number) => {
  try {
    const curr = await Currency.findByPk(id)
    if (!curr) throw 'currency not found'
    await curr.destroy()

    return curr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}


export const getAllCurrency = async (withOwner: boolean = false) => {

  try {
    const allCurr = await Currency.findAll(withOwner ? { include: ['totalOwner'] } : {})
    // if (!withOwner) return allCurr.map((curr) => curr.dataValues)

    return allCurr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface GetOneCurrencyOptions {
  id?: number;
  symbol?: string;
  withOwner?: boolean;
}

export const getOneCurrency = async (options: GetOneCurrencyOptions) => {
  const symbolCap = options.symbol?.toLocaleUpperCase();
  try {
    const curr = await Currency.findOne(
      {
        where: options.id ? { id: options.id } : { symbol: symbolCap },
        include : options.withOwner ? ['totalOwner'] : []
      });
    if (!curr) throw 'currency not found'

    return curr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
