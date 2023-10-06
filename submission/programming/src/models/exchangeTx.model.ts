import { Model, ObjectId, Schema, model } from "mongoose";
import { DefaultModel, ModelNames } from "./_constrain";

export enum StatusExchangeTx {
  PENDING, SUCCESSED, FAILED
}
export interface IExchangeTx extends DefaultModel {
  exchange: ObjectId;
  fromAddress: ObjectId;
  targetAddress: ObjectId;
  initialAmount: number;
  receivedAmount: number;
  status: StatusExchangeTx;
  provider: string;
  detail: string;
}

const exchangeTx = new Schema<IExchangeTx, Model<IExchangeTx>>({
  exchange: {
    ref: ModelNames.ExchangeModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
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
    type: String,
    default: null
  },
  status: {
    type: Number,
    enum: StatusExchangeTx,
    default: StatusExchangeTx.PENDING,
  }
})

const ExchangeTx = model('ExchangeTx', exchangeTx)
export default ExchangeTx;
