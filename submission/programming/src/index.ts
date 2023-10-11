import express from 'express';
import dotenv from 'dotenv';
import sequelize from './databases/connect.sequelize';
import config from './configs/app.config'
import { getCEXAccountId } from './services/account.service';
import { seeder } from './utils/seedDB';

dotenv.config();
const app = express();

const startServer = async () => {
  await config(app)

  try {
    await sequelize.authenticate()
    await sequelize.sync()

    const cex = await getCEXAccountId()
    if (cex instanceof Error || !cex) {
      await seeder()
    }

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
