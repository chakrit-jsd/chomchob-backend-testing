import { RequestHandler } from "express";
import { getAllExRate, getOneExRate } from "../services/exchange.service";
import { IResponse } from "./_response";
import { Account } from "../models/Account.model";
import { getTwoCurrencyForExRateBySymbol } from "../services/currency.service";

interface UserReponse {
  exchange: string;
  rate: number;
  time: Date;
}

export const getAllExchange = <RequestHandler<unknown, IResponse>>(
  async (req, res, next) => {
    const user = req.user as Account;
    let allExRate = await getAllExRate(user?.role === 'admin' ? 'admin' : 'other')
    if (allExRate instanceof Error) return next(allExRate);

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'get all exchange rate success',
      data: allExRate,
    })
  }
)

interface IQParamsGetOneExRate {
  init: string;
  target: string;
}

export const getOneExchange = <RequestHandler<unknown, IResponse, unknown, IQParamsGetOneExRate>>(
  async (req, res, next) => {
    const user = req.user as Account;
    const { init, target } = req.query
    const two = await getTwoCurrencyForExRateBySymbol({
      initSymbol: init,
      targetSymbol: target,
    })
    if (two instanceof Error) return next(two)
    const exRate = await getOneExRate({
      initCurrency: two.initCurrency,
      targetCurrency: two.targetCurrency,
      role: user?.role === 'admin' ? 'admin' : 'other',
    })
    if (exRate instanceof Error) return next(exRate)

    return res.status(200).json({
      success: true,
      code: 200,
      message: `get exchange rate ${exRate.exchange} success`,
      data: exRate,
    })
  }
)
