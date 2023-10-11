import { Table, Column, Model, DataType, BelongsToMany, HasOne, HasMany } from "sequelize-typescript";
import { Bundle } from "./Bundle.model";
import { BundleDetail } from "./BundleDetail.model";
import { OnSelling } from "./OnSelling.model";
import { Stock } from "./Stock.model";

@Table({ timestamps: true })
export class Product extends Model {

    @Column(DataType.STRING)
    name!: string;
    @Column(DataType.STRING)
    detail!: string;
    @Column(DataType.INTEGER)
    price!: number;

    @HasOne(() => OnSelling, 'itemId')
    onSelling!: OnSelling;

    @HasMany(() => Stock, 'productId')
    stocks!: Stock[]

    @BelongsToMany(() => Bundle, () => BundleDetail)
    bundle!: Bundle[]
}