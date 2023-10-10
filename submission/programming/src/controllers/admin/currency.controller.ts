import { RequestHandler } from "express";
import { getAllCurrency, getOneCurrency } from "../../services/currency.service";
import { IResponse } from "../_response";
import { Balance } from "../../models/Balance.model";
import sequelize from "../../databases/connect.sequelize";
import { getOneAccount } from "../../services/account.service";

export const getAll = <RequestHandler<unknown, IResponse>>(
  async (req, res, next) => {
   const currencies = await getAllCurrency()
   if (currencies instanceof Error) return next(currencies)

   return res.status(200).json({
    success: true,
    code: 200,
    message: 'get all currency success',
    data: currencies,
   })
  }
)

interface IQParamsGetOneAndTotalBalance {
  symbol: string;
}

export const getOneAndTotalBalance = <RequestHandler<unknown, IResponse, unknown, IQParamsGetOneAndTotalBalance>>(
  async (req, res, next) => {
    const { symbol } = req.query
    const currency = await getOneCurrency({
      symbol: symbol,
      withOwner: true,
    })
    if (currency instanceof Error) return next(currency)
    return res.status(200).json({
      success: true,
      code: 200,
      message: `get total balance ${symbol.toLocaleUpperCase()} success`,
      data: currency,
    })
  }
)

interface IQParamsGetBalanceByOwner {
  owner: number | string;
}

export const getBalanceByOwner = <RequestHandler<unknown, IResponse, unknown, IQParamsGetBalanceByOwner>>(
  async (req, res, next) => {
    const { owner } = req.query
    console.log(Number(owner))
    const acc = await getOneAccount({
      id: !isNaN(Number(owner)) ? Number(owner) : undefined,
      username: typeof owner === 'string' ? owner : undefined,
      scope: 'AL1',
      withBalance: true,
    })
    if (acc instanceof Error) return next(acc);

    return res.status(200).json({
      success: true,
      code: 200,
      message: `get balance from owner ${owner} success`,
      data: acc,
    })
  }
)
