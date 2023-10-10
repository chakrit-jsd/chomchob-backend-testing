import { Transaction } from "sequelize"
import { ItransferTxOption, TransferTx } from "../models/TransferTx.model"

interface CreateTransferTx extends ItransferTxOption {}

export const createTransferTx = async (data: CreateTransferTx, transaction: Transaction) => {
  try {
    const tx = await TransferTx.create(data, { transaction })
    return tx
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

enum SpecificQuery {
  SENT= 'sent',
  RECEIVED = 'receivied'
}

interface GetAllTransferTx {
  accountId: number;
  type: 'sent' | 'received';
  order?: ['updatedAt', 'DESC' | 'ASC'];
  limit?: number;
  page?: number;
}
interface GetAllTransferTxReturn {
  sent: TransferTx[];
  received: TransferTx[];
}
export const getAllTransferTx = async (data: GetAllTransferTx): Promise<TransferTx[] | Error> => {
  try {
    const tx = await TransferTx.scope('ISTX').findAll({
      where: data.type === 'sent' ? { senderId: data.accountId } : { receiverId: data.accountId },
      order: [data.order || ['updatedAt', 'DESC']],
      limit: data.limit || 20,
      offset: (data.page ||  1) - 1,

    })
    return tx;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface GetSpecificTransferTx {
  senderId: number;
  receiverId : number;
  order?: ['updatedAt', 'DESC' | 'ASC'];
  limit?: number;
  page?: number;
}
export const getSpecificTransferTx = async (data: GetSpecificTransferTx) => {
  try {
      const tranferTx = await TransferTx.scope('ISTX').findAll({
        where: { senderId: data.senderId, receiverId: data.receiverId },
        order: [data.order || ['updatedAt', 'DESC']],
        limit: data.limit || 20,
        offset: (data.page ||  1) - 1,
      })
      return tranferTx;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
