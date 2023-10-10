import sequelize from "../databases/connect.sequelize";
import { SwapTx } from "../models/SwapTx.model";
import { additionAmount, getWalletByOwnerHasCurrency, subtractionAmount } from "./balance.service";
import { getOneCurrency } from "./currency.service";
import { swapCurrency } from "./swap.service";
import { createTransferTx } from "./transferTx.service";


export interface TransferCurrency {
  senderId: number;
  receiverId: number;
  initSymbol: string;
  targetSymbol: string;
  initAmount: number;
}
export const transferCurrency = async (data: TransferCurrency) => {
  try {
    let swapTx: SwapTx;
    let amountForSend = data.initAmount;
    if (data.initSymbol !== data.targetSymbol) {
      const result = await swapCurrency({ accountId: data.senderId, amount: data.initAmount, initSymbol: data.initSymbol, targetSymbol: data.targetSymbol })
      if (result instanceof Error) throw result;
      swapTx = result
      amountForSend = result.receivedAmount;
    }
    const currency = await getOneCurrency({ symbol: data.targetSymbol })
    if (currency instanceof Error) throw currency;

    const senderWallet = await getWalletByOwnerHasCurrency({ ownerId: data.senderId, currencyId: currency.id })
    if (senderWallet instanceof Error) throw senderWallet;
    // console.log(amountForSend, senderWallet.amount)
    if (amountForSend > senderWallet.amount) throw 'amount is not enough'

    const receiverWallet = await getWalletByOwnerHasCurrency({ ownerId: data.receiverId, currencyId: currency.id })
    if (receiverWallet instanceof Error) throw receiverWallet;

    const result = await sequelize.transaction(async (transaction) => {
      const uSenderWallet = await subtractionAmount({ wallet: senderWallet, amount: amountForSend }, transaction)
      if (uSenderWallet instanceof Error) throw uSenderWallet;

      const uReceiverWallet = await additionAmount({ wallet: receiverWallet, amount: amountForSend}, transaction)
      if (uReceiverWallet instanceof Error) throw uReceiverWallet;

      const tx = await createTransferTx({
        senderId: data.senderId,
        receiverId: data.receiverId,
        fromAddress: swapTx?.dataValues.fromAddress || senderWallet.address,
        targetAddress: receiverWallet.address,
        currencyEx: data.initSymbol.toLocaleUpperCase() + '/' + data.targetSymbol.toLocaleUpperCase(),
        initialAmount: data.initAmount,
        receivedAmount: amountForSend,
        exTx: swapTx?.id || null
      }, transaction)
      if (tx instanceof Error) throw tx
      return tx
    })
    return result
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
