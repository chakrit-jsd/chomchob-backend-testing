import { Router } from "express";
import * as currency from './../controllers/admin/currency.controller';
import * as addjust from "../controllers/admin/addjust.controller";
import * as manage from "../controllers/admin/manage.controller";
import { validateBody, validateQuery } from "../middlewares/validator/validator";
import { adminGetBalanceOwner, adminOneAndTotalbalance } from "../middlewares/validator/query/admin.currency.schema";
import { adminAddNewCurrency, adminEditNameCurrency } from "../middlewares/validator/body/admin.currency.schema";
import { adminAdjustRate } from "../middlewares/validator/body/admin.adjust.schema";
import { adminGetSpecificTransfer, adminGetUserHistory, adminGetallUser } from "../middlewares/validator/query/admin.manage.schema";
import { adminIncAndDec } from "../middlewares/validator/body/admin.wallet.schema";

const adminRoute = Router();

adminRoute.get('/currency', currency.getAll)
adminRoute.get('/currency/c?', validateQuery(adminOneAndTotalbalance), currency.getOneAndTotalBalance)
adminRoute.get('/currency/o?', validateQuery(adminGetBalanceOwner), currency.getBalanceByOwner)

adminRoute.post('/currency/add_newcurrency', validateBody(adminAddNewCurrency), currency.postAddNewCurrency)
adminRoute.put('/currency/edit_namecurrency', validateBody(adminEditNameCurrency), currency.putEditNameCurrency)

adminRoute.put('/addjust/rate', validateBody(adminAdjustRate), addjust.putAddjustRate)

adminRoute.get('/manage/accounts?', validateQuery(adminGetallUser), manage.getAllUser)
adminRoute.get('/manage/history?', validateQuery(adminGetUserHistory), manage.getUserHistory)
adminRoute.get('/manage/history/s?',validateQuery(adminGetSpecificTransfer), manage.getSpecificTransfer)
adminRoute.post('/manage/wallet',validateBody(adminIncAndDec), manage.postIncreaseAndDecrease)

export default adminRoute;
