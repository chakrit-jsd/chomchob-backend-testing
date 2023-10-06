import {Table, Column, Model, DataType, DeletedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel } from "./_constrain";
import { Currency } from './Currency.model';

export enum AdjustType {
  NULL = 'null',
  PERCENTAGE = 'percentage',
  PLAIN = 'plain',
}

export interface IExchange extends DefaultModel {
  initialCurrencyId: number;
  targetCurrencyId: number;
  adjust: number;
  adjustType: AdjustType;
}

interface IExchangeOption extends Optional<IExchange, 'adjust' | 'adjustType'> {}

@Table({ timestamps: true })
export class Exchange extends Model<IExchange, IExchangeOption> {

  @Column(DataType.FLOAT(3,2))
  adjust!: number;

  @Column({
    type: DataType.ENUM(AdjustType.NULL, AdjustType.PERCENTAGE, AdjustType.PLAIN),
    defaultValue: AdjustType.NULL,
  })
  adjustType!: string;

  @DeletedAt
  deletedAt?: any;

  @BelongsTo(() => Currency, 'initialCurrencyId')
  initialCurrency!: Currency;

  @BelongsTo(() => Currency, 'targetCurrencyId')
  targetCurrency!: Currency;
}
