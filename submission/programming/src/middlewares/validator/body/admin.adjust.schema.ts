import Joi from "joi";
import { AddjustExRate } from "../../../services/exchange.service";

export const adminAdjustRate = Joi.object<AddjustExRate>({
  onlyEx: Joi
    .alternatives()
    .optional()
    .try(
      Joi.array().items(Joi.string().alphanum().max(5)).length(2),
      Joi.string().alphanum().max(5)
    ),
  addjust: Joi
    .number()
    .required(),
  addjustType: Joi
    .string()
    .required()
    .valid('plain', 'percentage')
})
