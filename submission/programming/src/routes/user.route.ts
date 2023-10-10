import { Router } from 'express';
import * as wallet from '../controllers/user/wallet.controller'

const userRoute = Router();

userRoute.get('/wallets', wallet.getWallet)
userRoute.post('/wallets/transfer', wallet.postTransfer)
userRoute.post('/wallets/swap', wallet.postSwapCurrency)

export default userRoute;
