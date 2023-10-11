import { RequestHandler } from "express";
import { GetOneAccountOptions, getAllAccount, getCEXAccountId, getOneAccount } from "../../services/account.service";
import { IResponse } from "../_response";
import { getAllTransferTx, getSpecificTransferTx } from "../../services/transferTx.service";
import { getAllSwapTx } from "../../services/swapTx.service";
import { TransferCurrency, transferCurrency } from "../../services/transfer.service";
import { getOneCurrency } from "../../services/currency.service";


interface IQParamsGetAllUser {
  limit?: number;
  page?: number;
  order?: 'DESC' | 'ASC';
  role?: 'CEX' | 'admin' | 'user';
  balance?: 0 | 1
}
export const getAllUser = <RequestHandler<unknown, IResponse, unknown, IQParamsGetAllUser>>(
  async (req, res, next) => {
    const { limit, page, order, role, balance } = req.query
    const allAcc = await getAllAccount({ limit, page, order, role, withBalance: Boolean(Number(balance)) })
    if (allAcc instanceof Error) return next(allAcc)

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'get all account success',
      data: {
        page: page || 1,
        limit: limit || 20,
        accounts: allAcc,
      },
    })
  }
)

interface IQParamsGetUserHistroy {
  owner: string | number;
  type: 'sent' | 'received' | 'swap';
  order? : 'DESC' | 'ASC';
  limit?: number;
  page?: number;

}
export const getUserHistory = <RequestHandler<unknown, IResponse, unknown, IQParamsGetUserHistroy>>(
  async (req, res, next) => {
    const { owner, type, order, limit, page } = req.query
    console.log(isNaN(Number(owner)) ? { username : String(owner) } : { id : Number(owner) })
    if (!type) return next(new Error('not found'))
    const op: GetOneAccountOptions  = isNaN(Number(owner)) ? { username : String(owner) } : { id : Number(owner) }
    const user = await getOneAccount(op)
    if (user instanceof Error) return next(user)

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

interface IQParamsGetSpecific {
  sender: string | number;
  receiver: string | number;
  date?: 'DESC' | 'ASC';
  limit?: number;
  page?: number;
}

export const getSpecificTransfer = <RequestHandler<unknown, IResponse, unknown, IQParamsGetSpecific>>(
  async (req, res, next) => {
    const { sender, receiver, date, limit, page } = req.query
    const op1: GetOneAccountOptions  = isNaN(Number(sender)) ? { username : String(sender) } : { id : Number(sender) }
    const user1 = await getOneAccount(op1)
    if (user1 instanceof Error) return next(user1)
    const op2: GetOneAccountOptions  = isNaN(Number(receiver)) ? { username : String(receiver) } : { id : Number(receiver) }
    const user2 = await getOneAccount(op2)
    if (user2 instanceof Error) return next(user2)

    const tx = await getSpecificTransferTx({
      senderId: user1.id,
      receiverId: user2.id,
      order: ['updatedAt', date ?  date : 'DESC' ],
      page,
      limit
    });
    if (tx instanceof Error) return next(tx)

    return res.status(200).json({
      success: true,
      code: 200,
      message: `get transfer history from ${user1.username} to ${user2.username}`,
      data: {
        page: page || 1,
        limit: limit || 20,
        tx: tx,
      }
    })
  }
)

interface IReqPostTransferCurrency {
  target: string | number;
  currency: string;
  amount: number;
  type: 'increase' | 'decrease';
}

export const postIncreaseAndDecrease = <RequestHandler<unknown, IResponse, IReqPostTransferCurrency>>(
  async (req, res, next) => {
    const { target, currency, amount, type } = req.body
    const op: GetOneAccountOptions  = isNaN(Number(target)) ? { username : String(target) } : { id : Number(target) }
    const user = await getOneAccount(op)
    if (user instanceof Error) return next(user);
    const CEXId = await getCEXAccountId()
    if (CEXId instanceof Error) return next(CEXId)

    const tOp: Pick<TransferCurrency, 'senderId' | 'receiverId'> = {
      senderId: NaN,
      receiverId: NaN,
    };
    if (type === 'increase') {
      tOp.senderId = CEXId;
      tOp.receiverId = user.id
    }
    if (type === 'decrease') {
      tOp.senderId = user.id;
      tOp.receiverId = CEXId;
    }

    const result = await transferCurrency({
      ...tOp,
      initSymbol: currency,
      targetSymbol: currency,
      initAmount: amount,
    })

    if (result instanceof Error) return next(result)
    return res.status(201).json({
      success: true,
      code: 201,
      message: `admin ${type} ${amount} ${currency.toLocaleUpperCase()} target ${user.username} `,
      data: result
    })
  }
)
