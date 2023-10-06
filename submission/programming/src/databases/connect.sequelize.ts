import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Account } from '../models/Account.model';
import { Currency } from '../models/Currency.model';
import { Balance } from '../models/Balance.model';
import { Exchange } from '../models/Exchange.model';
import { ExchangeTx } from '../models/ExchangeTx.model';
import { TransferTx } from '../models/TransferTx.model';
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  models: [Account, Currency, Balance, Exchange, ExchangeTx, TransferTx],
  // logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

export default sequelize;
