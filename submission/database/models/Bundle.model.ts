import { Table, Column, Model, DataType,HasOne, BelongsToMany } from "sequelize-typescript";
import { Product } from "./Product.model";
import { BundleDetail } from "./BundleDetail.model";
import { OnSelling } from "./OnSelling.model";

@Table({ timestamps: true })
export class Bundle extends Model {

    @Column(DataType.STRING)
    name!: string;
    @Column(DataType.STRING)
    detail!: string;
    @Column(DataType.INTEGER)
    price!: number;

    @HasOne(() => OnSelling, 'itemId')
    onSelling!: OnSelling

    @BelongsToMany(() => Product, () => BundleDetail)
    product!: Product[]
}