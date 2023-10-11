import Joi from "joi";
import { IReqPostTransferCurrency } from "../../../controllers/admin/manage.controller";

export const adminIncAndDec = Joi.object<IReqPostTransferCurrency>({
  target: Joi
    .string()
    .required()
    .alphanum(),
  currency: Joi
    .string()
    .required()
    .alphanum()
    .max(5),
  amount: Joi
    .number()
    .required()
    .positive(),
  type: Joi
    .string()
    .required()
    .valid('increase', 'decrease')

})
