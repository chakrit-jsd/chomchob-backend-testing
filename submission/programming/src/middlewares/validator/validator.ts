import { RequestHandler } from 'express'
import { ObjectSchema } from 'joi'

export const validateBody = (schema: ObjectSchema) => <RequestHandler<unknown, unknown, unknown>>(
  async (req, res, next) => {
    try {
      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
)

export const validateQuery = (schema: ObjectSchema) => <RequestHandler<unknown, unknown, unknown, unknown>>(
  async (req, res, next) => {
    try {
      await schema.validateAsync(req.query)
      next()
    } catch (error) {
      next(error)
    }
  }
)
