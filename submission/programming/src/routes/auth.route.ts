import { Router } from 'express';
import * as auth from '../controllers/auth.controller';

const authRoute = Router()

authRoute.post('/register', auth.register)
authRoute.post('/login', auth.logIn)
authRoute.get('/logout', auth.logOut)


export default authRoute
