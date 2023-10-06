import {Table, Column, Model, DataType, DeletedAt, HasMany} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { DefaultModel, Role } from './_constrain';
import { Balance } from './Balance.model';


export interface IAccount extends DefaultModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

interface IAccountOption extends Optional<IAccount, 'role'> {}

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
    type: DataType.ENUM(Role.ADMIN, Role.USER),
    defaultValue: Role.USER,
  })
  role!: string;

  @DeletedAt
  deletedAt?: any;

  @HasMany(() => Balance, 'ownerId')
  totalBalance!: Balance[];
}
