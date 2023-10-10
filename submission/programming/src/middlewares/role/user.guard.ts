import { RequestHandler } from "express";
import { Account } from "../../models/Account.model";

export const userGuard = <RequestHandler>(
  async (req, res, next) => {
    if (!req.user) return next(new Error('please login'))
    const user = req.user as Account
    if (user.role !== 'user') return next(new Error('permission denied'))

    next()
  }
)
