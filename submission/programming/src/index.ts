import express from 'express';
import dotenv from 'dotenv';
import sequelize from './databases/connect.sequelize';
import { Account } from './models/Account.model';
import { Role } from './models/_constrain';
import { Currency } from './models/Currency.model';
import { Exchange } from './models/Exchange.model';
import { Balance } from './models/Balance.model';
import { ExchangeTx } from './models/ExchangeTx.model';
import { TransferTx } from './models/TransferTx.model';
import { seeder } from './utils/seedDB';
import { addCurrency, deleteCurrency, getAllCurrency, getOneCurrency } from './services/currency.service';
import { createAccount, getAllAccount, getOneAccout, updateAccount } from './services/account.service';

dotenv.config();


const app = express();


app.get('/ping', (req, res) => res.send('pong'))
// app.get('/testmodel', async (req, res) => {

//   // res.send(m);
// })

// app.get('/testall', async (req, res) => {
// })
console.log(process.env.DB_NAME);

(async () => {
  try {
    // sequelize.sync()
    await sequelize.authenticate()
    // await sequelize.drop()
    await Account.sync()
    await Currency.sync()
    await Exchange.sync()
    await Balance.sync()
    await ExchangeTx.sync()
    await TransferTx.sync()
    // addCurrency({ })
    // updateCurrency({ })
    // await sequelize.sync()
    // seeder()
    // const res = deleteCurrency(8)
    // console.log( await res)
    // const res = await getAllCurrency(true)
    // // console.log(typeof 1)
    // const res1 = await getOneCurrency({ symbol: 'btc' })
    // console.log(res1)
    // const res = await createAccount({
    //   firstName: '1234',
    //   lastName: '124',
    //   username: '1245',
    //   password: 'asdfasf'
    // })
    // const res = await getOneAccout({ id: 1, withBalance: true })
    // console.log(JSON.stringify(res, null, 2))
    getAllAccount({ withBalance: true })
    // Currency.create({
    //   name: 'ethereum',
    //   symbol: 'ETH',
    //   dollarPrice: 1234,
    // })
    // Exchange.create({
    //   initialCurrencyId: 3,
    //   targetCurrencyId: 1,
    // })
    // const res = await Exchange.findOne({ where: { id: 1 }, include: ['initialCurrency'] })
    // console.log(res)

    // Account.create({
    //   username: 'test123',
    //   password: 'test1234',
    //   firstName: 'testtest',
    //   lastName: 'testtest',
    // })

    // const acc = await Account.findByPk(1)
    // console.log(await acc?.$count('totalBalance'))
    // // const res2 = await acc?.$create('totalBalance', { ownerId: acc.id, currencyId: 1 });
    // // // console.log(res2)
    // const res3 = await acc?.reload({
    //   include: {
    //     model: Balance,
    //     as: 'totalBalance',
    //     include: [
    //       {
    //         model: Currency,
    //         as: 'currency',
    //       }
    //     ]
    //   }})
    // // const arr = res3?.totalBalance.map((v) => v.dataValues)
    // console.log(JSON.stringify(res3, null, 2))
  } catch (error) {
    console.log(error)
  }
})();

const port = Number(process.env.BACKEND_PORT || 3000);

app.listen(port, () => {
  console.log(`App listening port: ${port}`)
});
