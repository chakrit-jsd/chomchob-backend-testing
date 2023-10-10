import { where } from 'sequelize';
import { AddCurrencyDTO, UpdateCurrencyDTO } from '../DTOs/currency.dto';
import { Currency } from './../models/Currency.model';
import { createCEXWallet } from './balance.service';
import { createNewExchange } from './exchange.service';
import { Balance } from '../models/Balance.model';

export const addCurrency = async (data: AddCurrencyDTO) => {
  try {
    const curr = await Currency.create({
      name: data.name,
      symbol: data.symbol,
      dollarPrice: data.dollarPrice,
    })
    await createNewExchange(curr.id)
    const wallet = await createCEXWallet({ currencyId: curr.id, amount: data.amount})
    if (wallet instanceof Error) throw wallet

    return {
      currency: curr,
      CEXWallet: wallet,
    }
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
  const scope = [];
  if (options.withOwner) scope.push('TTW')
  try {
    const curr = await Currency.scope(scope).findOne(
      {
        where: options.id ? { id: options.id } : { symbol: symbolCap }
      });
    if (!curr) throw 'currency not found'

    return curr
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface GetTwoCurrencyForExRateBySymbol {
  initSymbol: string;
  targetSymbol: string;
}
interface TwoCurrencyReturn {
  initCurrency: Currency;
  targetCurrency: Currency;
}
export const getTwoCurrencyForExRateBySymbol = async (data: GetTwoCurrencyForExRateBySymbol): Promise<TwoCurrencyReturn | Error> => {
  try {
    const init = await Currency.findOne({ where: { symbol: data.initSymbol.toLocaleUpperCase() }})
    const target = await Currency.findOne({ where: { symbol: data.targetSymbol.toLocaleUpperCase() }})
    if (!init || !target) throw 'not found'
    const twoCureency: TwoCurrencyReturn = {
      initCurrency: init,
      targetCurrency: target,
    }
    return twoCureency;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
