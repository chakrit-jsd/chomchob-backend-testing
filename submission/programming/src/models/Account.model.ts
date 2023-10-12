import { Table, Column, Model, DataType, DeletedAt, HasMany, Scopes, NotNull, AllowNull } from 'sequelize-typescript';
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
    attributes: ['id', 'username', 'firstName', 'lastName', 'role', 'createdAt']
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
      attributes: ['address', 'amount', 'updatedAt'],
      include: [{
        model: Currency,
        as: 'currency',
        attributes: ['id', 'name', 'symbol', 'dollarPrice', 'updatedAt']
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

  @Column({
    type: DataType.STRING(60),
    unique: true,
  })
  password!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(30),
    unique: true,
  })
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
