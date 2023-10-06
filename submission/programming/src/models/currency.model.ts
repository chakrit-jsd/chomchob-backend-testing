import { Model, ObjectId, Schema, model } from "mongoose";
import { DefaultModel } from "./_constrain";

export interface ICurrency extends DefaultModel {
  name: string;
  symbol: string;
  dollarPrice: number;
}


const currencySchema = new Schema<ICurrency, Model<ICurrency>>({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 5,
  },
  dollarPrice: {
    type: Number,
    required: true,
    min: 0.0001,
  }
}, {timestamps: true})

const CurrencyModel = model('Currency', currencySchema)
export default CurrencyModel;
