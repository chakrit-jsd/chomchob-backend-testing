import {Table, Column, Model, DataType, DeletedAt, HasMany, Scopes} from 'sequelize-typescript';
import { DefaultModel } from "./_constrain";
import { Balance } from './Balance.model';
import { Sequelize } from 'sequelize';
import sequelize from '../databases/connect.sequelize';

export interface ICurrency extends DefaultModel {
  name: string;
  symbol: string;
  dollarPrice: number;
}

@Scopes(() => ({
  TTW: {
    include: {
      model: Balance,
      as: 'totalOwner',
      order: [['amount', 'DESC']],
      attributes: [
        'address', 'amount', 'tier', 'ownerId',
      ],
    },
    attributes: {
      include: [
        [Sequelize.literal(`(
          select sum(amount)
          from Balances as balances
          where
          balances.currencyId = currency.id
        )`),
         'totalBalance' ]
      ]
    }
  }
}))
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
  totalOwner!: Balance[];
}
