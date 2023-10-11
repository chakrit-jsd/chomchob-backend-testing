import { Table, Column, Model, DataType, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { OnSelling } from "./OnSelling.model";
import { OrderDetail } from "./OrderDetail.model";

@Table({ timestamps: true })
export class Order extends Model {

    @Column({
        type: DataType.ENUM('pending', 'success'),
        defaultValue: null,
    })
    status!: string;

    @Column(DataType.INTEGER)
    totalPrice!: number;

    @BelongsTo(() => Customer, 'customerId')
    customer!: Customer

    @BelongsToMany(() => OnSelling, () => OrderDetail)
    onSelling!: OnSelling[]
}