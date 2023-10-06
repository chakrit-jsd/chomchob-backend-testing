import {Table, Column, Model, DataType, DeletedAt} from 'sequelize-typescript';
import { DefaultModel } from "./_constrain";

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

  @Column({
    type: DataType.INTEGER({ length: 11, decimals: 4, unsigned: true })
  })
  dollarPrice!: number;

  @DeletedAt
  deletedAt?: any;
}
