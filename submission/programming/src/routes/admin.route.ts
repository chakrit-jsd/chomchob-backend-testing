import { Router } from "express";
import * as currency from './../controllers/admin/currency.controller';

const adminRoute = Router();

adminRoute.get('/currency', currency.getAll)
adminRoute.get('/currency/c?', currency.getOneAndTotalBalance)
adminRoute.get('/currency/o?', currency.getBalanceByOwner)

adminRoute.post('/currency/add_newcurrency', currency.postAddNewCurrency)
adminRoute.put('/currency/edit_namecurrency', currency.putEditNameCurrency)


export default adminRoute;
