import { RequestHandler } from 'express'
import { createAccount } from '../services/account.service';
import { IResponse } from './_response';
import passport from 'passport';
import { Account } from '../models/Account.model';

export interface IReqRegisterBody {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const register = <RequestHandler<unknown, IResponse, IReqRegisterBody>>(
  async (req, res, next) => {
    const acc = await createAccount(req.body)
    // console.log(acc)
    if (acc instanceof Error) {
      console.log('create err')
      return next(acc)
    }

    return res.status(201).json({
      success: true,
      code: 201,
      message: 'create account successfully',
      data: acc
    })
  }
)

export const logIn = <RequestHandler<unknown, IResponse>>(
  async (req, res, next) => {
    passport.authenticate('local', (err: Error | null, user: Account) => {
      if (err) return next(err)
      req.logIn(user, (err: Error | null) => {
        if (err) return next(err)

        return res.status(200).json({
          success: true,
          code: 200,
          message: 'login success',
          data: null
        })
      })
    })(req, res, next)
  }
)

export const logOut = <RequestHandler<unknown, IResponse>>(
  async (req, res, next) => {
    req.logOut((err: unknown) => {
      if (err) return next(err)

      res.status(200).json({
        success: true,
        code: 200,
        message: 'logout success',
        data: null
      })
    })
  }
)
