import {Table, Column, Model, DataType, DeletedAt, ForeignKey, BelongsTo, AllowNull} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Currency } from './Currency.model';
import { Exchange } from './Exchange.model';
import { Balance } from './Balance.model';
import { Account } from './Account.model';

export enum StatusExchangeTx {
  PENDING = 'pending',
  SUCCESSED = 'successed',
  FAILED = 'failed'
}
export interface IExchangeTx extends DefaultModel {
  ownerId: number;
  fromAddress: string;
  targetAddress: string;
  rate: number;
  currencyEx: string;
  initialAmount: number;
  receivedAmount: number;
  // status: StatusExchangeTx;
  provider: string;
  detail: string;
}

export interface IExchangeTxOption extends Optional<IExchangeTx, 'provider' | 'detail'> {}

@Table({ timestamps: true })
export class ExchangeTx extends Model<IExchangeTx, IExchangeTxOption> {

  @Column(DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }))
  rate!: number;

  @Column(DataType.STRING)
  currencyEx!: string

  @Column(DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }))
  initialAmount!: number

  @Column(DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }))
  receivedAmount!: number

  // @Column({
  //   type: DataType.ENUM(StatusExchangeTx.PENDING, StatusExchangeTx.SUCCESSED, StatusExchangeTx.FAILED),
  //   defaultValue: StatusExchangeTx.PENDING,
  // })
  // status!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'CHOMCHOB-CEX'
  })
  provider!: string

  @AllowNull
  @Column(DataType.STRING)
  detail?: string;


  @BelongsTo(() => Account, 'ownerId')
  owner!: Account;

  @BelongsTo(() => Balance, 'formAdress')
  form!: Balance;

  @BelongsTo(() => Balance, 'targetAdress')
  target!: Balance;
}
