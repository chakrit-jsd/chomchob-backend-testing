import { Router } from 'express';
import * as wallet from '../controllers/user/wallet.controller'
import * as history from '../controllers/user/history.controller';

const userRoute = Router();

userRoute.get('/wallets?', wallet.getWallet)
userRoute.post('/wallets/transfer', wallet.postTransfer)
userRoute.post('/wallets/swap', wallet.postSwapCurrency)

userRoute.get('/history?', history.getTransferHistory)

export default userRoute;
