import {Table, Column, Model, DataType, DeletedAt, ForeignKey, BelongsTo, AllowNull, Scopes} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Currency } from './Currency.model';
import { Exchange } from './Exchange.model';
import { Balance } from './Balance.model';
import { SwapTx } from './SwapTx.model';
import { Account } from './Account.model';


export enum StatusTransferTx {
  PENDING = 'pending',
  SUCCESSED = 'successed',
  FAILED = 'failed'
}

export interface ITransferTx extends DefaultModel {
  senderId: number;
  receiverId: number;
  fromAddress: string
  targetAddress: string
  currencyEx: string;
  exTx?: number
  initialAmount: number
  receivedAmount: number
  // status: StatusTransferTx
}

export interface ItransferTxOption extends Optional<ITransferTx, 'exTx'> {}

@Scopes(() => ({
  ISTX: {
    include: ['exchangeTx']
  }
}))

@Table({ timestamps: true })
export class TransferTx extends Model<ITransferTx, ItransferTxOption> {

  @Column(DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }))
  initialAmount!: number

  @Column(DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }))
  receivedAmount!: number

  @Column(DataType.STRING)
  currencyEx!: string

  @BelongsTo(() => Account, 'senderId')
  sender!: Account

  @BelongsTo(() => Account, 'receiverId')
  receiver!: Account

  @BelongsTo(() => Balance, 'fromAddress')
  form!: Balance;

  @BelongsTo(() => Balance, 'targetAddress')
  target!: Balance;

  @BelongsTo(() => SwapTx, 'exTx')
  exchangeTx?: SwapTx;

  // @Column({
  //   type: DataType.ENUM(StatusTransferTx.PENDING, StatusTransferTx.SUCCESSED, StatusTransferTx.FAILED),
  //   defaultValue: StatusTransferTx.PENDING,
  // })
  // status!: string;
}
