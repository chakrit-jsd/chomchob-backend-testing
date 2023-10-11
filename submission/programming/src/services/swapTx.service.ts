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

interface GetSwapTx {
  ownerId: number;
  order?: ['updatedAt', 'DESC' | 'ASC'];
  limit?: number;
  page?: number;
}

export const getAllSwapTx = async (data: GetSwapTx) => {
  try {
    const tx = await SwapTx.findAll({
      where: { ownerId: data.ownerId },
      order: [data.order || ['updatedAt', 'DESC']],
      limit: data.limit || 20,
      offset: ((data.page ||  1) - 1) * (data.limit || 20),
    })
    return tx;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
