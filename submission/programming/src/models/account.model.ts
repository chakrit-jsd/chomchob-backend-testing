import { DefaultModel } from './_constrain';
import { Model, ObjectId, Schema, model } from "mongoose";


export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IAccount extends DefaultModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

const accountSchema = new Schema<IAccount, Model<IAccount>>({
  username: {
    type: String,
    unique: true,
    required: true,
    min: 4,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  role: {
    type: String,
    required: true,
    enum: Role,
    default: Role.USER,
  }
}, {timestamps: true})

const AccountModel = model('Account', accountSchema)
export default AccountModel;
