import { type } from 'os';
import { RequestHandler } from "express";
import { IResponse } from "../_response";
import { getAllTransferTx } from '../../services/transferTx.service';
import { Account } from '../../models/Account.model';
import { getAllSwapTx } from '../../services/swapTx.service';


interface IQParamsGetHistroy {
  type: 'sent' | 'received' | 'swap';
  order? : 'DESC' | 'ASC';
  limit?: number;
  page?: number;

}
export const getTransferHistory = <RequestHandler<unknown, IResponse, unknown, IQParamsGetHistroy>>(
  async (req, res, next) => {
    const user = req.user as Account
    const { type, order, limit, page } = req.query

    if (!type) return next(new Error('not found'))

    let data;
    if (type === 'sent' || type === 'received') {
      const tx = await getAllTransferTx({
        accountId: user.id,
        type: type,
        order: ['updatedAt', order || 'DESC'],
        limit: limit,
        page: page,
      })
      if (tx instanceof Error) return next(tx)
      data = tx;
    }
    if (type === 'swap') {
      const tx = await getAllSwapTx({
        ownerId: user.id,
        order: ['updatedAt', order || 'DESC'],
        limit: limit,
        page: page,
      })
      if (tx instanceof Error) return next(tx)
      data = tx
    }
    return res.status(200).json({
      success: true,
      code: 200,
      message: `get history ${type} success`,
      data: {
        page: page || 1,
        limit: limit || 20,
        tx: data
      }
    })
  }
)
