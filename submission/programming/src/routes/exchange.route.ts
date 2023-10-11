import { Router } from 'express';
import * as exchange from '../controllers/exchange.controller';

const exchangeRoute = Router()

exchangeRoute.get('/', exchange.getAllExchange)
exchangeRoute.get('/c?', exchange.getOneExchange)

export default exchangeRoute;
