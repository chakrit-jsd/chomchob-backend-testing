import express , { Express } from 'express';
import authRoute from '../routes/auth.route';
import session from 'express-session'
import dotenv from 'dotenv';
import passport from 'passport';
import compression from 'compression'
import cors from 'cors'
import { errorHandler } from '../controllers/error.controller'
import { connectRedis } from '../databases/connect.redis';
import router from '../routes/router';
import '../middlewares/passport/local.passport'

export default async (app: Express) => {
  dotenv.config();
  const redisStore = await connectRedis()
  const sessionOp: session.SessionOptions = {
    secret: process.env.SS_SECRET || 'asdfasdfsadf',
    store: redisStore as unknown as session.Store,
    cookie: {
      httpOnly: true,
      secure: 'auto',
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'none',
    },
    rolling: true,
    saveUninitialized: false,
    resave: false,
  }

  app.use(cors({ credentials: true, origin: true }))
  app.use(compression())
  app.use(express.json())

  app.use(session(sessionOp))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api/v1', router)
  app.use(errorHandler)
}
