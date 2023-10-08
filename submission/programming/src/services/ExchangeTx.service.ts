import { Transaction } from "sequelize"
import { ExchangeTx, IExchangeTxOption } from "../models/ExchangeTx.model"


interface CreateExTx extends IExchangeTxOption {

}
export const createExTx = async (data: CreateExTx, transaction: Transaction) => {
  try {
    const tx = ExchangeTx.create(data, { transaction })
    return tx
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
