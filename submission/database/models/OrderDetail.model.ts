import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { OnSelling } from "./OnSelling.model";
import { Order } from "./Order.model";

@Table({ timestamps: true })
export class OrderDetail extends Model {
    @ForeignKey(() => OnSelling)
    @Column(DataType.INTEGER)
    onSellingId!: number;

    @ForeignKey(() => Order)
    @Column(DataType.INTEGER)
    orderId!: number;
    
    @BelongsTo(() => OnSelling, 'onSellingId')
    onSelling!: OnSelling;
    @BelongsTo(() => Order, 'orderId')
    order!: Order;

}