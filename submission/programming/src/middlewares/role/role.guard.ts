import { RequestHandler } from "express";
import { Account } from "../../models/Account.model";

export const roleGuard = (role: 'admin' | 'user') => <RequestHandler>(
  async (req, res, next) => {
    if (!req.user) return next(new Error('please login'))
    const user = req.user as Account
    if (user.role !== role) return next(new Error('permission denied'))

    next()
  }
)
