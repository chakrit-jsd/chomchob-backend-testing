import passport from "passport";
import * as bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from "passport-local";
import { getOneAccount } from "../../services/account.service";
import { Account } from "../../models/Account.model";
// import { IStrategyOptions } from "@types/passport-local";

passport.use(new LocalStrategy({
  session: true
}, async (username: string, password: string, next) => {
  try {
    const user = await getOneAccount({ username })
    if (user instanceof Error) return next(user)

    const result = await bcrypt.compare(password, user.password)
    if (!result) return next(new Error('username or password invalid'))

    return next(null, user)
  } catch (error) {
    next(error)
  }

}))


passport.serializeUser<number>((user, next) => {
  const u = user as Account;
  return next(null, u.id)
})


passport.deserializeUser<number>(async (id, next) => {
  const user = await getOneAccount({ id })
  if (user instanceof Error) return next(user)
  return next(null, user)
})
