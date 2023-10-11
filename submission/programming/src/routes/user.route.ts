import { Router } from 'express';
import * as wallet from '../controllers/user/wallet.controller'
import * as history from '../controllers/user/history.controller';
import { validateBody, validateQuery } from '../middlewares/validator/validator';
import { userSwap, userTransfer } from '../middlewares/validator/body/user.wallet.schema';
import { userHistory } from '../middlewares/validator/query/user.history.schema';

const userRoute = Router();

userRoute.get('/wallets?', wallet.getWallet)
userRoute.post('/wallets/transfer', validateBody(userTransfer), wallet.postTransfer)
userRoute.post('/wallets/swap', validateBody(userSwap), wallet.postSwapCurrency)

userRoute.get('/history?', validateQuery(userHistory), history.getTransferHistory)

export default userRoute;
