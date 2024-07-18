import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";
import { IReview } from "../../domain/models/review";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "review",
})
export class Review extends Model<IReview> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  userId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  toggle!: boolean;

  @BelongsTo(() => User)
  user!: User;
}
