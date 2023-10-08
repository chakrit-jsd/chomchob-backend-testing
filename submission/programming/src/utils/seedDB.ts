import axios from "axios";
import bcrypt from 'bcrypt'
import { AddCurrencyDTO } from "../DTOs/currency.dto";
import { Account } from "../models/Account.model";
import { Balance } from "../models/Balance.model";
import { Currency } from "../models/Currency.model";
import { addCurrency } from "../services/currency.service";
import { createNewExchange } from "../services/exchange.service";
import { Role } from "../models/_constrain";

const cyptoData: {[key: string]: string} = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  BNB: 'BNB',
  XRP: 'XRP',
  ADA: 'Cardano',
  DOGE: 'Dogecoin',
  SOL: 'Solana',
  TRX: 'TRON',
}

export const seeder = async () => {

  // for (let i = 0; i < 100; i++) {
  //   const acc = Account.Bu
  // }
  // Currency.build({

  // })
  await Account.create({
    username: 'CEX',
    password: await bcrypt.hash('4ij0cvlmn20scvps3k0', 15),
    firstName: 'CEX',
    lastName: 'CEX',
    role: Role.CEX,
  })
  for (const i in cyptoData) {

    const res = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${i}/USD`, { headers: { 'X-CoinAPI-Key': 'AF8CE943-3925-4BE7-B78E-D1D6C6C4E02B'}})

    const add: AddCurrencyDTO = {
      name: cyptoData[i],
      symbol: res.data.asset_id_base,
      dollarPrice: res.data.rate.toFixed(4),
      amount: 9999999,
    }
    const curr = await addCurrency(add)
    // if (curr instanceof Error) continue;
    // await createNewExchange(curr.id)
    console.log(curr)
  }
}
