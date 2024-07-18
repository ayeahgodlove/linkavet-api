import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { ICartItem } from "../../domain/models/cart-item";
import { User } from "./user";
import { Product } from "./product";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "cartItem",
})
export class CartItem extends Model<ICartItem> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  productId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountPercentage!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountedPrice!: number;

  // relationships

  @BelongsTo(() => User, "userId")
  user!: User;

  @BelongsTo(() => Product, "productId")
  product!: Product;
}
