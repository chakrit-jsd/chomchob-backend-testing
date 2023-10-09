import express from 'express';
import dotenv from 'dotenv';
import sequelize from './databases/connect.sequelize';
import config from './configs/app.config'
import { getOneAccount } from './services/account.service';

dotenv.config();
const app = express();

const startServer = async () => {
  await config(app)

  try {
    await sequelize.authenticate()
    const port = Number(process.env.BACKEND_PORT || 3000);
    app.listen(port, () => {
      console.log(`App listening port: ${port}`)
    });
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
