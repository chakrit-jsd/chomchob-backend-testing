import { Op, Transaction } from "sequelize"
import { Currency } from "../models/Currency.model"
import { AdjustType, Exchange } from "../models/Exchange.model"
import { getAllCurrency, getOneCurrency } from "./currency.service"
import sequelize from "../databases/connect.sequelize"

export const createNewExchange = async (newCureencyId: number) => {
  try {
    const allCurr = await getAllCurrency()
    if (allCurr instanceof Error) throw allCurr
    const init = [];
    const target = [];
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
  baseRate?: number;
  finalRate?: number;
  rate?: number;
  addjust?: number;
  addjustType?: string;
  time: Date;
}
interface GetOneExRateInstance {
  initCurrency: Currency;
  targetCurrency: Currency;
  role: 'admin' | 'other';
}

export async function getOneExRate(data: GetOneExRateInstance): Promise<GetOneRateReturn | Error> {
  try {
    const init = data.initCurrency;
    const target = data.targetCurrency;
    const ex = await Exchange.findOne({ where: { initialCurrencyId: init.id, targetCurrencyId: target.id }})
    if (!ex) throw 'exchange not found'
    const baseRate = init.dollarPrice / target.dollarPrice
    let finalRate = baseRate;
    if (ex.adjust) {
      finalRate = baseRate + (ex.adjustType === AdjustType.PLAIN ? ex.adjust : (baseRate/100) * ex.adjust)
    }
    const exRate: GetOneRateReturn = {
      exchange: init.symbol + '/' + target.symbol,
      rate: Number(finalRate.toFixed(8)),
      time: new Date(Math.max(new Date(init.updatedAt).getTime(), new Date(target.updatedAt).getTime()))
    }
    if (data.role === 'admin') {
      exRate.rate = undefined;
      exRate.baseRate = Number(baseRate.toFixed(8))
      exRate.finalRate = Number(finalRate.toFixed(8))
      exRate.addjust = ex.adjust
      exRate.addjustType = ex.adjustType
    }

    return exRate
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export const getAllExRate = async (role: 'admin' | 'other'): Promise<GetOneRateReturn[] | Error> => {
  try {
    const data: GetOneRateReturn[] = [];
    const allEx = await Exchange.findAll({ include: ['initialCurrency', 'targetCurrency'], order: [['initialCurrencyId', 'ASC']] });
    // console.log(allEx)
    for (const ex of allEx) {
      const baseRate = ex.initialCurrency.dollarPrice / ex.targetCurrency.dollarPrice
      let finalRate = baseRate;
      if (ex.adjust) {
        finalRate = baseRate + (ex.adjustType === AdjustType.PLAIN ? ex.adjust : (baseRate/100) * ex.adjust)
      }
      const pData: GetOneRateReturn = {
        exchange: ex.initialCurrency.symbol + '/' + ex.targetCurrency.symbol,
        rate: Number(finalRate.toFixed(6)),
        time: new Date(Math.max(new Date(ex.initialCurrency.updatedAt).getTime(), new Date(ex.targetCurrency.updatedAt).getTime()))
      }

      if (role === 'admin') {
        pData.baseRate = Number(baseRate.toFixed(8))
        pData.finalRate = Number(finalRate.toFixed(8))
        pData.addjust = ex.adjust
        pData.addjustType = ex.adjustType
        pData.rate = undefined
      }

      data.push(pData)
    }
    return data
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface AddjustExRate {
  onlyEx?: [string, string] | string;
  addjust: number;
  addjustType: AdjustType.PLAIN | AdjustType.PERCENTAGE;
}

export const addjustExRate = async (data: AddjustExRate) => {
  try {
    if (data.onlyEx) {
      if (typeof data.onlyEx === 'string') {
        const c = await getOneCurrency({ symbol: data.onlyEx })
        if (c instanceof Error) throw c;
        const result = await sequelize.transaction(async (transaction) => {
          const exs = await Exchange.update({ adjust: data.addjust, adjustType: data.addjustType },
            {
              where: {
                [Op.or]: {
                  initialCurrencyId: c.id,
                  targetCurrencyId: c.id
                }
              },
              transaction: transaction
            } )
          return exs
        })
        return result;
      }
    }
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
