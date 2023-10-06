import { Document, Model, ObjectId, Schema, model } from "mongoose";
import { DefaultModel, ModelNames } from "./_constrain";

export enum AdjustType {
  NULL, PERCENTAGE, PLAIN,
}

export interface IExchangeRate extends DefaultModel {
  initialCurrency: ObjectId;
  targetCurrency: ObjectId;
  adjust: number;
  adjustType: AdjustType;
}

// interface IExchangeRateDocument extends IExchangeRate, Document {
//   getExRate(): number;
// }

const exchangeRateSchema = new Schema<IExchangeRate, Model<IExchangeRate>>({
  initialCurrency: {
    ref: ModelNames.CurrencyModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
  targetCurrency: {
    ref: ModelNames.CurrencyModel,
    type: Schema.Types.ObjectId,
    required: true,
  },
  adjust: {
    type: Number,
    min: -100,
    max: 100,
    default: 0,
  },
  adjustType: {
    type: Number,
    enum: AdjustType,
    default: AdjustType.NULL
  }
}, {timestamps: true})

// exchangeRateSchema.methods.getExRate = function ()


const ExchangeModel = model('Exchange', exchangeRateSchema)
export default ExchangeModel;
