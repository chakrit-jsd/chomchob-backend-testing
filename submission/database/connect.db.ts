import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Customer } from './models/Customer.model';
import { Product } from './models/Product.model';
import { Stock } from './models/Stock.model';
import { Bundle } from './models/Bundle.model';
import { BundleDetail } from './models/BundleDetail.model';
import { OnSelling } from './models/OnSelling.model';
import { PromotionOnSelling } from './models/PromotionOnSelling.model';
import { Promotion } from './models/Promotion.model';
import { Order } from './models/Order.model';
import { OrderDetail } from './models/OrderDetail.model';
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  models: [
    Customer, 
    Product, 
    Stock, 
    Bundle, 
    BundleDetail, 
    OnSelling, 
    PromotionOnSelling, 
    Promotion,
    Order,
    OrderDetail
  ],
  // logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

export default sequelize;
