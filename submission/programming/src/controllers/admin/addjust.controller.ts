import { RequestHandler } from "express";
import { AddjustExRate, addjustExRate } from "../../services/exchange.service";
import { AdjustType } from "../../models/Exchange.model";
import { IResponse } from "../_response";


interface IReqPutAddjustRateBody extends AddjustExRate {}

export const putAddjustRate = <RequestHandler<unknown, IResponse, IReqPutAddjustRateBody>>(
  async (req, res, next) => {
    // const { onlyEx, addjust, addjustType } = req.body;
    const result = await addjustExRate(req.body)

    if (result instanceof Error) return next(result)
    if (!result || result[0] === 0) return next(new Error('not update'))
    return res.status(200).json({
      success: true,
      code: 200,
      message: 'update exchange rate success',
      data: result[0] + ' rows'
    })
  }
)
