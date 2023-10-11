import { getOneCurrency } from './../../services/currency.service';
import { RequestHandler } from "express";
import { IAddNewCurrency, addCurrency, getAllCurrency, updateCurrency } from "../../services/currency.service";
import { IResponse } from "../_response";
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


export const postAddNewCurrency = <RequestHandler<unknown, IResponse, IAddNewCurrency>>(
  async (req, res, next) => {
    const body = req.body
    const result = await addCurrency(body)
    if (result instanceof Error) return next(result);

    return res.status(201).json({
      success: true,
      code: 201,
      message: `add new currency ${body.name} success`,
      data: result,
    })
  }
)

interface IReqEditCurrency {
  oldSymbol: string;
  newName: string;
  newSymbol: string;
}

export const putEditNameCurrency = <RequestHandler<unknown, IResponse, IReqEditCurrency>>(
  async (req, res, next) => {
    const { oldSymbol, newSymbol, newName } = req.body
    const currency = await getOneCurrency({ symbol: oldSymbol })
    if (currency instanceof Error) return next(currency)

    const result = await updateCurrency({
      currency: currency,
      name: newName,
      symbol: newSymbol.toLocaleUpperCase(),
    })
    if (result instanceof Error) return next(result);

    return res.status(200).json({
      success: true,
      code: 200,
      message: `change currency name ${currency.name} to ${result.name} success`,
      data: result
    })
  }
)
