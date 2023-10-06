import { Model, ObjectId, Schema, model } from "mongoose";
import { DefaultModel, ModelNames } from "./_constrain";

export interface IBalance extends DefaultModel {
  owner: ObjectId;
  currency: ObjectId;
  amount: number;
}

const balanceSchema = new Schema<IBalance, Model<IBalance>>({
  owner: {
    ref: ModelNames.AccountModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
  currency: {
    ref: ModelNames.CurrencyModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    default: 0,
  }
}, {timestamps: true})


const BalanceModel = model('Balance', balanceSchema)
export default BalanceModel;
