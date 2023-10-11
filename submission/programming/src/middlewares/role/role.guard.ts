import { RequestHandler } from "express";
import { Account } from "../../models/Account.model";

export const roleGuard = (role: 'admin' | 'user' | 'guest' | 'not guest') => <RequestHandler>(
  async (req, res, next) => {
    if (role === 'guest' && req.user) return next(new Error('please logout'))
    if (role === 'not guest' && !req.user) return next(new Error('please login'))
    if (role !== 'not guest' && role !== 'guest') {
      const user = req.user as Account
      if (user.role !== role) return next(new Error('permission denied'))
    }

    next()
  }
)
