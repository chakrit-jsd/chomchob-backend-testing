import { IAccount } from "../models/Account.model";

export interface CreateAccountDTO extends Pick<IAccount, 'firstName' | 'lastName' | 'username' | 'password'> {}

export interface UpdateAccountDTO extends Partial<Pick<CreateAccountDTO, 'firstName' | 'lastName'>> {
  id: number;
}

export interface ChangePasswordDTO {
  id: number;
  newPassword: string;
}
