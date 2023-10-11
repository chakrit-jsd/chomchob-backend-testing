import { Table, Column, Model, DataType, PrimaryKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./Product.model";

@Table({ timestamps: true })
export class Stock extends Model {
    @PrimaryKey
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4
    })
    code!: string;
  

    @Column({
        type: DataType.ENUM('in_order', 'sold'),
        defaultValue: null,
    })
    status!: string;

    @BelongsTo(() => Product, 'productId')
    product!: Product    

}