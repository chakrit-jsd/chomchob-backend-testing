import { SqlError } from 'mariadb';
import { AddCurrencyDTO, UpdateCurrencyDTO } from '../DTOs/currency.dto';
import { Currency, ICurrency } from './../models/Currency.model';

export const addCurrency = async (add: AddCurrencyDTO) => {
  try {
    const curr = await Currency.create({
      name: add.name,
      symbol: add.symbol,
      dollarPrice: add.dollarPrice,
    })

    return curr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export const updateCurrency = async (update: UpdateCurrencyDTO) => {
  try {
    const curr = await Currency.findByPk(update.id)
    if (!curr) throw 'not found'

    curr.name = update.name || curr.name
    curr.symbol = update.symbol || curr.symbol
    curr.dollarPrice = update.dollarPrice || curr.dollarPrice
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
    if (!curr) throw 'not found'
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
    if (!withOwner) return allCurr.map((curr) => curr.dataValues)

    return allCurr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface GetOneCurrencyOp {
  id?: number;
  symbol?: string;
  withOwner?: boolean;
}

export const getOneCurrency = async (options: GetOneCurrencyOp) => {
  let symbolCap = options.symbol?.toLocaleUpperCase();
  try {
    const curr = await Currency.findOne(
      {
        where: options.id ? { id: options.id } : { symbol: symbolCap },
        include : options.withOwner ? ['totalOwner'] : []
      });
    if (!curr) throw 'not found'

    return curr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
