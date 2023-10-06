import {Table, Column, Model, DataType, DeletedAt, ForeignKey, BelongsTo, AllowNull} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Currency } from './Currency.model';
import { Exchange } from './Exchange.model';
import { Balance } from './Balance.model';

export enum StatusExchangeTx {
  PENDING = 'pending',
  SUCCESSED = 'successed',
  FAILED = 'failed'
}
export interface IExchangeTx extends DefaultModel {
  exchangeId: number;
  fromAddress: string;
  targetAddress: string;
  initialAmount: number;
  receivedAmount: number;
  status: StatusExchangeTx;
  provider: string;
  detail: string;
}


@Table({ timestamps: true })
export class ExchangeTx extends Model<IExchangeTx> {


  @Column(DataType.INTEGER({ length: 11, decimals: 4, unsigned: true }))
  initialAmount!: number

  @Column(DataType.INTEGER({ length: 11, decimals: 4, unsigned: true }))
  receivedAmount!: number

  @Column({
    type: DataType.ENUM(StatusExchangeTx.PENDING, StatusExchangeTx.SUCCESSED, StatusExchangeTx.FAILED),
    defaultValue: StatusExchangeTx.PENDING,
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'CHOMCHOB-CEX'
  })
  provider!: string

  @AllowNull
  @Column(DataType.STRING)
  detail?: string;


  @BelongsTo(() => Exchange, 'exchangeId')
  exchange!: Exchange;

  @BelongsTo(() => Balance, 'formAdress')
  form!: Balance;

  @BelongsTo(() => Balance, 'targetAdress')
  target!: Balance;
}
