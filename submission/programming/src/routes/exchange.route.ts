import { Router } from 'express';
import * as exchange from '../controllers/exchange.controller';
import { validateQuery } from '../middlewares/validator/validator';
import { userHistory } from '../middlewares/validator/query/user.history.schema';
import { oneExRate } from '../middlewares/validator/query/nGuest.getOneEx.schema';

const exchangeRoute = Router()

exchangeRoute.get('/', exchange.getAllExchange)
exchangeRoute.get('/c?',validateQuery(oneExRate), exchange.getOneExchange)

export default exchangeRoute;
