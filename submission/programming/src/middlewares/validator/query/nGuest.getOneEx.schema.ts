import Joi from "joi";
import { IQParamsGetOneExRate } from "../../../controllers/exchange.controller";

export const oneExRate = Joi.object<IQParamsGetOneExRate>({
  init: Joi
    .string()
    .required()
    .alphanum()
    .max(5),
  target: Joi
    .string()
    .required()
    .alphanum()
    .max(5)
})
