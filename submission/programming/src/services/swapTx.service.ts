import { Transaction } from "sequelize"
import { IExchangeTxOption, SwapTx } from "../models/SwapTx.model"


interface CreateExTx extends IExchangeTxOption {

}
export const createExTx = async (data: CreateExTx, transaction: Transaction) => {
  try {
    const tx = SwapTx.create(data, { transaction })
    return tx
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
