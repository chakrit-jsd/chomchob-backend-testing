import {Table, Column, Model, DataType, DeletedAt, ForeignKey, BelongsTo, AllowNull} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Currency } from './Currency.model';
import { Exchange } from './Exchange.model';
import { Balance } from './Balance.model';
import { ExchangeTx } from './ExchangeTx.model';


export enum StatusTransferTx {
  PENDING = 'pending',
  SUCCESSED = 'successed',
  FAILED = 'failed'
}

export interface ITransferTx extends DefaultModel {
  fromAddress: string
  targetAddress: string
  exTx?: number
  initialAmount: number
  receivedAmount: number
  status: StatusTransferTx
}

@Table({ timestamps: true })
export class TransferTx extends Model<ITransferTx> {

  @Column(DataType.INTEGER({ length: 11, decimals: 4, unsigned: true }))
  initialAmount!: number

  @Column(DataType.INTEGER({ length: 11, decimals: 4, unsigned: true }))
  receivedAmount!: number


  @BelongsTo(() => Balance, 'formAdress')
  form!: Balance;

  @BelongsTo(() => Balance, 'targetAdress')
  target!: Balance;

  @BelongsTo(() => ExchangeTx, 'exTx')
  exchangeTx?: ExchangeTx;

  @Column({
    type: DataType.ENUM(StatusTransferTx.PENDING, StatusTransferTx.SUCCESSED, StatusTransferTx.FAILED),
    defaultValue: StatusTransferTx.PENDING,
  })
  status!: string;
}
