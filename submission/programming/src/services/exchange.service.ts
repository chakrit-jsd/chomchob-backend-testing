import { AdjustType, Exchange } from "../models/Exchange.model"
import { getAllCurrency, getOneCurrency } from "./currency.service"

export const createNewExchange = async (newCureencyId: number) => {
  try {
    const allCurr = await getAllCurrency()
    if (allCurr instanceof Error) throw allCurr
    const init = [];
    const target = [];
    console.log(allCurr)
    for (const curr of allCurr) {
      if (curr.id === newCureencyId) continue;
      init.push({
        initialCurrencyId: newCureencyId,
        targetCurrencyId: curr.id,
      });
      target.push({
        initialCurrencyId: curr.id,
        targetCurrencyId: newCureencyId,
      });
    }

    const newEx = await Exchange.bulkCreate([...init, ...target])
    // console.log(newEx)
    return newEx
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface GetOneRateReturn {
  exchange: string;
  baseRate: number;
  finalRate: number;
  addjust: number;
  addjustType: string;
  time: Date;
}

export const getOneExRate = async (initSymbol: string, targetSymbol: string): Promise<GetOneRateReturn | Error> => {
  try {
    const init = await getOneCurrency({ symbol: initSymbol })
    const target = await getOneCurrency({ symbol: targetSymbol })
    if (init instanceof Error || target instanceof Error) throw init instanceof Error ? init : target
    const ex = await Exchange.findOne({ where: { initialCurrencyId: init.id, targetCurrencyId: target.id }})
    if (!ex) throw 'exchange not found'
    const baseRate = init.dollarPrice / target.dollarPrice
    let finalRate = baseRate;
    if (ex.adjust) {
      finalRate = baseRate + (ex.adjustType === AdjustType.PLAIN ? ex.adjust : baseRate * ex.adjust)
    }
    const data: GetOneRateReturn = {
      exchange: init.symbol + '/' + target.symbol,
      baseRate: baseRate,
      finalRate: finalRate,
      addjust: ex.adjust,
      addjustType: ex.adjustType,
      time: new Date(Math.max(new Date(init.updatedAt).getTime(), new Date(target.updatedAt).getTime()))
    }
    return data
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}


export const getAllExRate = async (): Promise<GetOneRateReturn[] | Error> => {
  try {
    const data: GetOneRateReturn[] = [];
    const allEx = await Exchange.findAll({ include: ['initialCurrencyId', 'targetCurrencyId'] });
    for (const ex of allEx) {
      const baseRate = ex.initialCurrency.dollarPrice / ex.targetCurrency.dollarPrice
      let finalRate = baseRate;
      if (ex.adjust) {
        finalRate = baseRate + (ex.adjustType === AdjustType.PLAIN ? ex.adjust : baseRate * ex.adjust)
      }
      data.push({
        exchange: ex.initialCurrency.symbol + '/' + ex.targetCurrency.symbol,
        baseRate: baseRate,
        finalRate: finalRate,
        addjust: ex.adjust,
        addjustType: ex.adjustType,
        time: new Date(Math.max(new Date(ex.initialCurrency.updatedAt).getTime(), new Date(ex.targetCurrency.updatedAt).getTime()))
      })
    }
    return data
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
