import { Account, IAccount } from "../models/Account.model";
import bcrypt from 'bcrypt';

interface CreateAccountReturn extends Pick<IAccount, 'id' | 'username' | 'firstName' | 'lastName' | 'createdAt'> {}
interface ICreateAccount extends Pick<IAccount, 'username' | 'password' | 'firstName' | 'lastName'> {}
export const createAccount = async (data: ICreateAccount): Promise<CreateAccountReturn | Error> => {
  try {
    const hadhPassword = await bcrypt.hash(data.password, 10)
    data.password = hadhPassword;
    const acc = await Account.create(data)
    return {
      id: acc.id,
      username: acc.username,
      firstName: acc.firstName,
      lastName: acc.lastName,
      createdAt: acc.createdAt,
    }
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface IUpdateAccount {
  id: number;
  firstName: string;
  lastName: string;
}

export const updateAccount = async (data: IUpdateAccount) => {
  try {
    const acc = await Account.findByPk(data.id);
    if (!acc) throw 'account not found'

    acc.firstName = data.firstName || acc.firstName
    acc.lastName = data.lastName || acc.lastName
    const res = await acc.save()

    return res
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

interface IChangePassword {
  id: number;
  newPassword: string;
}

export const changePassword = async (data: IChangePassword) => {
  try {
    const acc = await Account.findByPk(data.id);
    if (!acc) throw 'account not found'

    acc.password = await bcrypt.hash(data.newPassword, 10)
    const res = await acc.save()
    return res;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export interface GetOneAccountOptions {
  id?: number;
  username?: string;
  withBalance?: boolean,
  scope?: 'AL1' | 'AL2'
}

export const getOneAccount = async (options: GetOneAccountOptions) => {
  const scopes: string[] = [];
  if (options.scope) scopes.push(options.scope)
  if (options.withBalance) scopes.push('IS2')
  try {
    const acc = await Account.scope(scopes).findOne({
      where: options.id ? { id: options.id } : {username: options.username}
    })
    if (!acc) throw 'account not found'
    return acc
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export interface GetAllAccountOptions {
  withBalance?: boolean;
  order?: 'DESC'| 'ASC';
  limit?: number;
  page?: number;
  role?: 'CEX' | 'admin' | 'user';
}

export const getAllAccount = async (options?: GetAllAccountOptions) => {
  const scopes: string[] = ['AL2']
  if (options?.withBalance) scopes.push('IS2')
  try {
    console.log((options?.page || 1) - 1)
    const accArr = await Account
    .scope(scopes)
    .findAll({
      where : options?.role ? { role : options?.role } : {} ,
      offset: ((options?.page || 1) - 1) * (options?.limit || 20),
      limit: options?.limit || 20,
      order: [['createdAt', options?.order || 'ASC']] ,
    })

    return accArr;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}

export const getCEXAccountId = async () => {
  try {
    const acc = await Account.findOne({ where: { username: 'CEX', role: 'CEX' }})
    return acc?.id as number
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
