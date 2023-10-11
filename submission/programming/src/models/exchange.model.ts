import {Table, Column, Model, DataType, DeletedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Currency } from './Currency.model';

export enum AdjustType {
  PERCENTAGE = 'percentage',
  PLAIN = 'plain',
}

export interface IExchange extends DefaultModel {
  initialCurrencyId: number;
  targetCurrencyId: number;
  addjust: number;
  addjustType: AdjustType;
}

interface IExchangeOption extends Optional<IExchange, 'addjust' | 'addjustType'> {}

@Table({ timestamps: true })
export class Exchange extends Model<IExchange, IExchangeOption> {

  @Column({
    type: DataType.FLOAT(5,2),
  })
  addjust!: number;

  @Column({
    type: DataType.ENUM(AdjustType.PERCENTAGE, AdjustType.PLAIN),
    defaultValue: null,
  })
  addjustType!: string;

  @DeletedAt
  deletedAt?: any;

  @BelongsTo(() => Currency, 'initialCurrencyId')
  initialCurrency!: Currency;

  @BelongsTo(() => Currency, 'targetCurrencyId')
  targetCurrency!: Currency;
}
