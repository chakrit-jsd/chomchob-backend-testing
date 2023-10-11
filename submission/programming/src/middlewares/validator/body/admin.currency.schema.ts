import Joi from "joi";
import { IReqEditCurrency } from "../../../controllers/admin/currency.controller";
import { IAddNewCurrency } from "../../../services/currency.service";

export const adminEditNameCurrency = Joi.object<IReqEditCurrency>({
  oldSymbol: Joi
    .string()
    .required()
    .alphanum()
    .max(5),
  newSymbol: Joi
    .string()
    .required()
    .alphanum()
    .max(5),
  newName: Joi
    .string()
    .required()
    .alphanum()
    .max(20)
})

export const adminAddNewCurrency = Joi.object<IAddNewCurrency>({
  name: Joi
    .string()
    .required()
    .alphanum()
    .max(20),
  symbol: Joi
    .string()
    .required()
    .alphanum()
    .min(2)
    .max(5),
  dollarPrice: Joi
    .number()
    .required()
    .positive(),
  amount: Joi
    .number()
    .required()
    .positive()
})
