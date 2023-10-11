import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { OnSelling } from "./OnSelling.model";
import { Promotion } from "./Promotion.model";


@Table({ timestamps: true })
export class PromotionOnSelling extends Model {

    @Column(DataType.INTEGER)
    weight!: number;


    @ForeignKey(() => OnSelling)
    @Column(DataType.INTEGER)
    onSellingId!: number;
    
    @ForeignKey(() => Promotion)
    @Column(DataType.INTEGER)
    promotionId!: number;
    
    
    @BelongsTo(() => OnSelling, 'onSellingId')
    bundle!: OnSelling;
    @BelongsTo(() => Promotion, 'promotionId')
    product!: Promotion;

}