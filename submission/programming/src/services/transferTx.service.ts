import { Transaction } from "sequelize"
import { ItransferTxOption, TransferTx } from "../models/TransferTx.model"

interface CreateTransferTx extends ItransferTxOption {}

export const createTransferTx = async (data: CreateTransferTx, transaction: Transaction) => {
  try {
    console.log(data)
    const tx = await TransferTx.create(data, { transaction })
    return tx
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
