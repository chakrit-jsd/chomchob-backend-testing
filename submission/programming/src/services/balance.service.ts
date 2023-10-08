import { Balance } from "../models/Balance.model";


interface CreateWallet {
  onwerId: number;
  currencyId: number;
}
export const getWalletByOwnerHasCurrency = async (data: CreateWallet) => {
  try {
    const [wallet] = await Balance.findOrCreate({
      where: { ownerId: data.onwerId, currencyId: data.currencyId }
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
export const updateWallet = async (data: UpdateWallet) => {
  try {
    const wallet = await data.wallet.reload()
    wallet.amount = wallet.amount + data.amount

    return await wallet.save()
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
