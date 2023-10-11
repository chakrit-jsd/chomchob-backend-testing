import Joi from "joi";
import { IQParamsGetHistroy } from "../../../controllers/user/history.controller";

export const userHistory = Joi.object<IQParamsGetHistroy>({
  type: Joi
    .string()
    .required()
    .valid('sent', 'received', 'swap'),
  order: Joi
    .string()
    .optional()
    .valid('DESC', 'ASC'),
  limit: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  page: Joi
    .number()
    .optional()
    .integer()
    .positive()
})
