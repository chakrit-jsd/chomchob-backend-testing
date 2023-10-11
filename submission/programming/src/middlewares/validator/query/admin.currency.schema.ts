import Joi from "joi";
import { IQParamsGetBalanceByOwner, IQParamsGetOneAndTotalBalance } from "../../../controllers/admin/currency.controller";

export const adminOneAndTotalbalance = Joi.object<IQParamsGetOneAndTotalBalance>({
  symbol: Joi
    .string()
    .required()
    .alphanum()
    .max(5)
})


export const adminGetBalanceOwner = Joi.object<IQParamsGetBalanceByOwner>({
  owner: Joi
    .string()
    .required()
    .alphanum()
})
