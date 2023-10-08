import { Op, Transaction } from "sequelize";
import { Account } from "../models/Account.model";
import { Balance } from "../models/Balance.model";

interface CreateWallet {
  ownerId: number;
  currencyId: number;
}
export const getWalletByOwnerHasCurrency = async (data: CreateWallet) => {
  try {
    const [wallet] = await Balance.findOrCreate({
      where: { ownerId: data.ownerId, currencyId: data.currencyId }
    })

    return wallet
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface UpdateWallet {
  wallet: Balance;
  amount: number;
}
export const additionAmount = async (data: UpdateWallet, transaction: Transaction) => {
  try {
    if (data.amount < 0) throw 'invalid amount'
    const wallet = await data.wallet.reload()
    wallet.amount = Number(wallet.amount) + Number(data.amount)

    return await wallet.save({ transaction })
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export const subtractionAmount = async (data: UpdateWallet, transaction: Transaction) => {
  try {
    if (-data.amount > 0) throw 'invalid amount'
    const wallet = await data.wallet.reload()
    if (data.amount > wallet.amount) throw 'CEX unavailable'
    wallet.amount = Number(wallet.amount) - Number(data.amount)

    return await wallet.save({ transaction })
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface CreateCEXWallet {
  currencyId: number;
  amount?: number;
}
export const createCEXWallet = async (data: CreateCEXWallet) => {

  try {
    const CEX = await Account.findOne({ where: { role: 'CEX', username: 'CEX' }})
    if (!CEX) throw 'CEX not found'
    const wallet = await getWalletByOwnerHasCurrency({
      ownerId: CEX.id,
      currencyId: data.currencyId
    });
    if (wallet instanceof Error) throw wallet
    wallet.amount = data.amount || 0
    wallet.tier = 'CEX'
    return await wallet.save()
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface GetCEXWallet {
  initCurrencyId: number;
  targetCurrencyId: number
}
interface GetCEXWalletReturn {
  initWallet: Balance;
  targetWallet: Balance
}
export const getCEXWallet = async (data: GetCEXWallet): Promise<GetCEXWalletReturn | Error> => {
  try {
    const wallets = await  Balance.findAll({
      where: {
        currencyId: { [Op.or]: [data.initCurrencyId+'', data.targetCurrencyId+''] },
        tier: 'CEX',
      }})

    return {
      initWallet: wallets[0].dataValues.currencyId === data.initCurrencyId ? wallets[0] : wallets[1],
      targetWallet: wallets[1].dataValues.currencyId === data.targetCurrencyId ? wallets[1] : wallets[0]
    }
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
