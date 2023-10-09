import {Table, Column, Model, DataType, DeletedAt, HasMany} from 'sequelize-typescript';
import { DefaultModel } from "./_constrain";
import { Balance } from './Balance.model';

export interface ICurrency extends DefaultModel {
  name: string;
  symbol: string;
  dollarPrice: number;
}

@Table({ timestamps: true })
export class Currency extends Model<ICurrency> {

  @Column({
    type: DataType.STRING(20),
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(5),
    unique: true,
  })
  symbol!: string;

  @Column(DataType.DECIMAL({ unsigned: true, precision: 16, scale: 4 }))
  dollarPrice!: number;

  @DeletedAt
  deletedAt?: any;

  @HasMany(() => Balance, 'currencyId')
  totalOwner!: Currency[];
}
