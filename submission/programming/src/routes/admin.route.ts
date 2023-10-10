import { Router } from "express";
import * as currency from './../controllers/admin/currency.controller';

const adminRoute = Router();

adminRoute.get('/currency', currency.getAll)
adminRoute.get('/currency/c?', currency.getOneAndTotalBalance)
adminRoute.get('/currency/o?', currency.getBalanceByOwner)


export default adminRoute;
