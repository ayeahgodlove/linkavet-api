import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { Product } from "./product";
import { Order } from "./order";
import { IProductOrder } from "../../domain/models/product-order";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "productOrder",
  modelName: "ProductOrder",
})
export class ProductOrder extends Model<IProductOrder> {
  @ForeignKey(() => Product)
  @Column
  productId!: string;

  @ForeignKey(() => Order)
  @Column
  orderId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  qtty!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount!: number;
}
