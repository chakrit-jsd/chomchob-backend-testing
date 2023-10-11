import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Order } from "./Order.model";

@Table({ timestamps: true })
export class Customer extends Model {

    @Column(DataType.STRING)
    username!: string;
    @Column(DataType.STRING)
    password!: string;
    @Column(DataType.STRING)
    fullname!: string;

    @HasMany(() => Order, 'customerId')
    orders!: Order[]
}