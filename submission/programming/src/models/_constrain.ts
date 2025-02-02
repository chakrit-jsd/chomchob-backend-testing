export enum ModelNames {
  AccountModel = 'AccountModel',
  BalanceModel = 'BalanceModel',
  CurrencyModel = 'CurrencyModel',
  ExchangeModel = 'ExchangeModel',
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  CEX = 'CEX',
}

export interface DefaultModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
