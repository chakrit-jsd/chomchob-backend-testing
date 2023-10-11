import Joi from "joi";
import { IQParamsGetAllUser, IQParamsGetSpecific, IQParamsGetUserHistroy } from "../../../controllers/admin/manage.controller";

export const adminGetallUser = Joi.object<IQParamsGetAllUser>({
  limit: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  page: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  order: Joi
    .string()
    .optional()
    .valid('DESC', 'ASC'),
  role: Joi
    .string()
    .optional()
    .valid('CEX', 'admin', 'user'),
  balance: Joi
    .number()
    .optional()
    .valid(0, 1)
})


export const adminGetUserHistory = Joi.object<IQParamsGetUserHistroy>({
  limit: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  page: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  order: Joi
    .string()
    .optional()
    .valid('DESC', 'ASC'),
  owner: Joi
    .string()
    .required()
    .alphanum(),
  type: Joi
    .string()
    .required()
    .valid('sent', 'received', 'swap')
})


export const adminGetSpecificTransfer = Joi.object<IQParamsGetSpecific>({
  limit: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  page: Joi
    .number()
    .optional()
    .integer()
    .positive(),
  order: Joi
    .string()
    .optional()
    .valid('DESC', 'ASC'),
  sender: Joi
    .string()
    .required()
    .alphanum(),
  receiver: Joi
    .string()
    .required()
    .alphanum()
})
