import {Table, Column, Model, DataType, DeletedAt, PrimaryKey, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Account } from './Account.model';
import { Currency } from './Currency.model';
import { TransferTx } from './TransferTx.model';


export interface IBalance extends Omit<DefaultModel, 'id'> {
  address: string;
  ownerId: number;
  currencyId: number;
  amount: number;
}

interface IBalanceOption extends Optional<IBalance, 'address' | 'amount'> {}

@Table({ timestamps: true })
export class Balance extends Model<IBalance, IBalanceOption> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  address!: string;

  @Column({
    type: DataType.DECIMAL({ unsigned: true, precision: 10, scale: 4 }),
    defaultValue: 0,
  })
  amount!: number;


  @BelongsTo(() => Account, 'ownerId')
  owner!: Account;

  @BelongsTo(() => Currency, 'currencyId')
  currency!: Currency;

}
