import { Model, ObjectId, Schema, model } from "mongoose";
import { DefaultModel, ModelNames } from "./_constrain";


export enum StatusTransferTx {
  PENDING, SUCCESSED, FAILED
}
export interface ITransferTx extends DefaultModel {
  fromAddress: ObjectId
  targetAddress: ObjectId
  detail?: ObjectId
  initialAmount: number
  receivedAmount: number
  status: StatusTransferTx
}


const transferTx = new Schema<ITransferTx, Model<ITransferTx>>({
  fromAddress: {
    ref: ModelNames.BalanceModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
  targetAddress: {
    ref: ModelNames.BalanceModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
  initialAmount: {
    type: Number,
    min: 0,
    required: true,
  },
  receivedAmount: {
    type: Number,
    min: 0,
    required: true,
  },
  detail: {
    ref: ModelNames.ExchangeModel,
    type: Schema.Types.ObjectId,
    default: null,
  },
  status: {
    type: Number,
    enum: StatusTransferTx,
    default: StatusTransferTx.PENDING,
  }

}, {timestamps: true})


const TransferTxModel = model('TransferTx', transferTx)
export default TransferTxModel;
