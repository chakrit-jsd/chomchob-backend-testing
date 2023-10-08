import {Table, Column, Model, DataType, DeletedAt, HasMany, Scopes} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel, Role } from './_constrain';
import { Balance } from './Balance.model';
import { Currency } from './Currency.model';


export interface IAccount extends DefaultModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

interface IAccountOption extends Optional<IAccount, 'role'> {}

@Scopes(() => ({
  AL1: {
    attributes: ['id', 'username', 'firstName', 'lastName']
  },
  AL2: {
    attributes: ['id', 'username', 'firstName', 'lastName', 'createdAt']
  },
  IS1: {
    include: {
      model: Balance,
      as: 'totalBalance'
    }
  },
  IS2: {
    include: {
      model: Balance,
      as: 'totalBalance',
      include: [{
        model: Currency,
        as: 'currency'
      }]
    }
  }
}))
@Table({ timestamps: true })
export class Account extends Model<IAccount, IAccountOption> {

  @Column({
    type: DataType.STRING(20),
    unique: true,
  })
  username!: string;

  @Column(DataType.STRING(60))
  password!: string;

  @Column(DataType.STRING(30))
  firstName!: string;

  @Column(DataType.STRING(30))
  lastName!: string;

  @Column({
    type: DataType.ENUM<Role>(Role.ADMIN, Role.USER, Role.CEX),
    defaultValue: Role.USER,
  })
  role!: string;

  @DeletedAt
  deletedAt?: any;

  @HasMany(() => Balance, 'ownerId')
  totalBalance!: Balance[];
}
