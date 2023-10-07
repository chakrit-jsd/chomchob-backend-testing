import axios from "axios";
import { AddCurrencyDTO } from "../DTOs/currency.dto";
import { Account } from "../models/Account.model";
import { Balance } from "../models/Balance.model";
import { Currency } from "../models/Currency.model";
import { addCurrency } from "../services/currency.service";

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
  for (const i in cyptoData) {

    const res = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${i}/USD`, { headers: { 'X-CoinAPI-Key': 'AF8CE943-3925-4BE7-B78E-D1D6C6C4E02B'}})

    const add: AddCurrencyDTO = {
      name: cyptoData[i],
      symbol: res.data.asset_id_base,
      dollarPrice: res.data.rate.toFixed(4),
    }
    await addCurrency(add)

  }
}
