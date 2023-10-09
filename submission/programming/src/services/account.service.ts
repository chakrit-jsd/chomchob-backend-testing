import { ChangePasswordDTO } from './../DTOs/account.dto';
import { CreateAccountDTO, UpdateAccountDTO } from "../DTOs/account.dto";
import { Account, IAccount } from "../models/Account.model";
import bcrypt from 'bcrypt';

interface CreateAccountReturn extends Pick<IAccount, 'id' | 'username' | 'firstName' | 'lastName' | 'createdAt'> {}
export const createAccount = async (data: CreateAccountDTO): Promise<CreateAccountReturn | Error> => {
  // const saltRound = Math.floor(Math.random() * (11 - 8)) + 8
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

export const updateAccount = async (data: UpdateAccountDTO) => {
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

export const changePassword = async (data: ChangePasswordDTO) => {
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

interface GetOneAccountOptions {
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

interface GetAllAccountOptions {
  withBalance?: boolean;
  order?: [string, string];
  limit?: number;
  page?: number;
}

export const getAllAccount = async (options: GetAllAccountOptions) => {
  options.order = !options.order ? ['createdAt', 'ASC'] : options.order
  const scopes: string[] = ['AL2']
  if (options.withBalance) scopes.push('IS2')
  try {
    const accArr = await Account
    .scope(scopes)
    .findAll({
      offset: (options.page || 1) - 1,
      limit: options.limit || 20,
      order: [options.order],
    })

    return accArr;
  } catch (error) {
    if (error instanceof Error) return error
    return new Error(error as string)
  }
}
