import { ObjectId } from "mongoose";

export enum ModelNames {
  AccountModel = 'AccountModel',
  BalanceModel = 'BalanceModel',
  CurrencyModel = 'CurrencyModel',
  ExchangeModel = 'ExchangeModel',
}


export interface DefaultModel {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
