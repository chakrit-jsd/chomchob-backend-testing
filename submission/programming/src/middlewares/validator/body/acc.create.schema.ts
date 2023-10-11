import Joi from "joi";
import { IReqRegisterBody } from "../../../controllers/auth.controller";

export const accCreate = Joi.object<IReqRegisterBody>({
  username: Joi
    .string()
    .required()
    .alphanum()
    .min(6)
    .max(20)
    .trim(),
  password: Joi
    .string()
    .required()
    .min(6)
    .max(20)
    .trim(),
  confirmPassword: Joi
    .any()
    .required()
    .valid(Joi.ref('password')),
  firstName: Joi
    .string()
    .required()
    .min(4)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/),
  lastName: Joi
    .string()
    .required()
    .min(4)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/)
})
