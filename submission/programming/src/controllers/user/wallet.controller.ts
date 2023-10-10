import { RequestHandler } from 'express'
import { IResponse } from '../_response';
import { getOneAccount } from '../../services/account.service';
import { Account } from '../../models/Account.model';
import { transferCurrency } from '../../services/transfer.service';
import { swapCurrency } from '../../services/swap.service';

export const getWallet = <RequestHandler<unknown, IResponse>>(
  async (req, res, next) => {
    const user = req.user as Account
    const accWithBalance = await getOneAccount({ id: user.id, withBalance: true, scope: 'AL1' })
    if (accWithBalance instanceof Error) return next(accWithBalance)

    return res.status(200).json({
      success: true,
      code: 200,
      message: 'get wallet success',
      data: accWithBalance.totalBalance,
    })
  }
)

interface IReqBodyTransfer {
  receiverUsername: string;
  initCurrency: string;
  targetCurrency: string;
  amount: number;
}

export const postTransfer = <RequestHandler<unknown, IResponse, IReqBodyTransfer>>(
  async (req, res, next) => {
    const user = req.user as Account
    const { receiverUsername, initCurrency, targetCurrency, amount } = req.body
    const targetAcc = await getOneAccount({ username: receiverUsername, scope: 'AL1' })
    if (targetAcc instanceof Error) return next(targetAcc);

    const transferTx = await transferCurrency({
      senderId: user.id,
      receiverId: targetAcc.id,
      initSymbol: initCurrency,
      targetSymbol: targetCurrency,
      initAmount: amount
    })
    if (transferTx instanceof Error) return next(transferTx);
    return res.status(201).json({
      success: true,
      code: 201,
      message: `you sent ${initCurrency.toLocaleUpperCase()}/${targetCurrency.toLocaleUpperCase()} to ${receiverUsername} success`,
      data: transferTx
    })
  }
)

interface IReqBodySwap {
  initCurrency: string;
  targetCurrency: string;
  initAmount: number;
}

export const postSwapCurrency = <RequestHandler<unknown, IResponse, IReqBodySwap>>(
  async (req, res, next) => {
    const user = req.user as Account
    const { initAmount, initCurrency, targetCurrency } = req.body
    const swapTx = await swapCurrency({
      accountId: user.id,
      initSymbol: initCurrency,
      targetSymbol: targetCurrency,
      amount: initAmount
    })
    if (swapTx instanceof Error) return next(swapTx);
    return res.status(201).json({
      success: true,
      code: 201,
      message: `you swap ${initCurrency.toLocaleUpperCase()} to ${targetCurrency.toLocaleUpperCase()} and received ${swapTx.receivedAmount} ${targetCurrency.toLocaleUpperCase()}`,
      data: swapTx,
    })
  }
)
