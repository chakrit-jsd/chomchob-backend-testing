import { Order } from './Order.model';
import { Table, Column, Model, DataType, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Bundle } from "./Bundle.model";
import { Promotion } from "./Promotion.model";
import { PromotionOnSelling } from "./PromotionOnSelling.model";
import { OrderDetail } from './OrderDetail.model';

@Table({ timestamps: true })
export class OnSelling extends Model {

    @Column(DataType.STRING)
    name!: string;
    @Column(DataType.DATE)
    openDate!: Date;
    @Column(DataType.DATE)
    closeDate!: Date;


    // ตรงนี้จะทำเป็น polymorphic
    @Column(DataType.ENUM('bundle', 'product'))
    type!: string
    @BelongsTo(() => Product, 'itemId')
    product!: Product;
    @BelongsTo(() => Bundle, 'itemId')
    bundle!: Bundle;

    @BelongsToMany(() => Promotion, () => PromotionOnSelling)
    promotion!: Promotion[]

    @BelongsToMany(() => Order, () => OrderDetail)
    orders!: Order[]
}
