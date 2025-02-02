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
  tier: string;
}

interface IBalanceOption extends Optional<IBalance, 'address' | 'amount'> {}

@Table({ timestamps: true })
export class Balance extends Model<IBalance, IBalanceOption> {
  static fn(arg0: string, arg1: any, arg2: string): string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal {
    throw new Error('Method not implemented.');
  }
  static col(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  address!: string;

  @Column({
    type: DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }),
    defaultValue: 0,
  })
  amount!: number;

  @Column({
    type: DataType.ENUM('CEX', 'user'),
    defaultValue: 'user'
  })
  tier!: string

  @BelongsTo(() => Account, 'ownerId')
  owner!: Account;

  @BelongsTo(() => Currency, 'currencyId')
  currency!: Currency;

}
