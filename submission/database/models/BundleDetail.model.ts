import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Bundle } from "./Bundle.model";
import { Product } from "./Product.model";

@Table({ timestamps: true })
export class BundleDetail extends Model {
    @ForeignKey(() => Bundle)
    @Column(DataType.INTEGER)
    bundleId!: number;
    
    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId!: number;
    
    @BelongsTo(() => Bundle, 'bundleId')
    bundle!: Bundle;
    @BelongsTo(() => Product, 'productId')
    product!: Product;

}