import Joi from "joi";
import { IReqBodySwap, IReqBodyTransfer } from "../../../controllers/user/wallet.controller";


export const userTransfer = Joi.object<IReqBodyTransfer>({
  receiverUsername: Joi
    .string()
    .required()
    .min(6)
    .max(20)
    .trim(),
  initCurrency: Joi
    .string()
    .required()
    .min(3)
    .max(5)
    .trim(),
  targetCurrency: Joi
    .string()
    .required()
    .min(3)
    .max(5)
    .trim(),
  amount: Joi
    .number()
    .positive()
    .required()
})


export const userSwap = Joi.object<IReqBodySwap>({
  initAmount: Joi
    .number()
    .positive()
    .required(),
  initCurrency: Joi
    .string()
    .required()
    .min(3)
    .max(5)
    .trim(),
  targetCurrency: Joi
    .string()
    .required()
    .min(3)
    .max(5)
    .trim(),
})
