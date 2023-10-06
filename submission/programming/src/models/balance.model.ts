import {Table, Column, Model, DataType, DeletedAt, PrimaryKey, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Account } from './Account.model';
import { Currency } from './Currency.model';


export interface IBalance extends Omit<DefaultModel, 'id'> {
  address: string;
  ownerId: number;
  currencyId: number;
  amount: number;
}

interface IBalanceOption extends Optional<IBalance, 'address'> {}

@Table({ timestamps: true })
export class Balance extends Model<IBalance, IBalanceOption> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  address!: string;

  @BelongsTo(() => Account, 'ownerId')
  owner!: Account;

  @BelongsTo(() => Currency, 'currencyId')
  currency!: Currency;

  // @Column({
  //   type: DataType.INTEGER({ length: 11, decimals: 4, unsigned: true })
  // })
  // amount!: number;
}
