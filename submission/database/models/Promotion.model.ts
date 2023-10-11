import { Table, Column, Model, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { OnSelling } from "./OnSelling.model";
import { PromotionOnSelling } from "./PromotionOnSelling.model";


@Table({ timestamps: true })
export class Promotion extends Model {

    @Column(DataType.STRING)
    name!: string;
    @Column(DataType.STRING)
    detail!: string;
    @Column(DataType.INTEGER)
    priceDiscount!: number;
    @Column(DataType.DATE)
    openDate!: Date;
    @Column(DataType.DATE)
    closeDate!: Date;

    
    @HasMany(() => PromotionOnSelling, 'promotionId')
    promotionDetals!: PromotionOnSelling[]

    @BelongsToMany(() => OnSelling, () => PromotionOnSelling)
    onSelling!: OnSelling[]
}   
