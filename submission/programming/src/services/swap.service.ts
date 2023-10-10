import { Transaction } from "sequelize";
import sequelize from "../databases/connect.sequelize";
import { Balance } from "../models/Balance.model";
import { additionAmount, getCEXWallet, getWalletByOwnerHasCurrency, subtractionAmount } from "./balance.service";
import { getOneCurrency, getTwoCurrencyForExRateBySymbol } from "./currency.service";
import { getOneExRate } from "./exchange.service";
import { createExTx } from "./swapTx.service";
interface SwapCurrency {
  accountId: number;
  initSymbol: string;
  targetSymbol: string;
  amount: number;
}
export const swapCurrency = async (data: SwapCurrency) => {
  try {
    //find currency id by symbol cypto
    const twoCurrency = await getTwoCurrencyForExRateBySymbol({ initSymbol: data.initSymbol, targetSymbol: data.targetSymbol })
    if (twoCurrency instanceof Error) throw twoCurrency;
    const { initCurrency, targetCurrency } = twoCurrency;

    //find or create wallet
    const initWallet = await getWalletByOwnerHasCurrency({ ownerId: data.accountId, currencyId: initCurrency.id })
    const targetWallet = await getWalletByOwnerHasCurrency({ ownerId: data.accountId, currencyId: targetCurrency.id })
    if (initWallet instanceof Error || targetWallet instanceof Error) throw initWallet instanceof Error ? initWallet : targetWallet;

    if (initWallet.amount < data.amount || data.amount < 0) throw 'amount is not enough'

    //find rate to swap
    const exRate = await getOneExRate({ initCurrency: initCurrency, targetCurrency: targetCurrency })
    if (exRate instanceof Error) throw exRate;

    //find CEX wallet for swap
    const CEX = await getCEXWallet({ initCurrencyId: initCurrency.id, targetCurrencyId: targetCurrency.id })
    if (CEX instanceof Error) throw CEX;
    if (CEX.initWallet.dataValues.ownerId === data.accountId) throw 'invalid method'

    //transaction
    const result = await sequelize.transaction(async (transaction) => {
      // 1. subtraction amount init wallet
      const uInitWallet = await subtractionAmount({ wallet: initWallet, amount: data.amount }, transaction)
      if (uInitWallet instanceof Error) throw uInitWallet;

      // 2. addtion amount CEX wallet
      const uCEXinitWallet = await additionAmount({ wallet: CEX.initWallet, amount: data.amount }, transaction)
      if (uCEXinitWallet instanceof Error) throw uCEXinitWallet;

      // 3. amount currency target cal by exchange rate
      const exAmount = Number(exRate.finalRate * data.amount);

      // 4. subtraction amount CEX wallet for send to target wallet
      const uCEXtargetWallet = await subtractionAmount({ wallet: CEX.targetWallet, amount: exAmount }, transaction)
      if (uCEXtargetWallet instanceof Error) throw uCEXtargetWallet;

      // 5. addition amount to target wallet
      const uTargetWallet = await additionAmount({ wallet: targetWallet, amount: exAmount }, transaction)
      if (uTargetWallet instanceof Error) throw uTargetWallet;

      // 6. write detail to TX
      const exTx = await createExTx({
        ownerId: data.accountId,
        fromAddress: initWallet.address,
        targetAddress: targetWallet.address,
        currencyEx: initCurrency.symbol + '/' + targetCurrency.symbol,
        rate: exRate.finalRate,
        initialAmount: data.amount,
        receivedAmount: Number(exAmount.toFixed(4)),
      }, transaction)
      if (exTx instanceof Error) throw exTx;
      return exTx
    })
    return result;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
