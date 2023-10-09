import express from 'express';
import * as auth from '../controllers/auth.controller';

const authRoute = express.Router()

authRoute.post('/register', auth.register)
authRoute.post('/login', auth.logIn)
authRoute.post('/logout', auth.logOut)


export default authRoute
