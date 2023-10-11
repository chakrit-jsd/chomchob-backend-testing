import { Router } from 'express';
import * as auth from '../controllers/auth.controller';
import { roleGuard } from '../middlewares/role/role.guard';
import { validateBody } from '../middlewares/validator/validator';
import { accCreate } from '../middlewares/validator/body/acc.create.schema';

const authRoute = Router()

authRoute.post('/register',
  roleGuard('guest'),
  validateBody(accCreate),
  auth.register
)

authRoute.post('/login', roleGuard('guest'), auth.logIn)
authRoute.get('/logout',roleGuard('not guest'), auth.logOut)


export default authRoute
