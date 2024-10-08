import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { IUserDoc } from "../../domain/models/user-doc";
import { User } from "./user";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user_doc",
})
export class UserDoc extends Model<IUserDoc> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  photo!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  idCard!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  license!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  diploma!: string;

  // verification paramters
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified!: boolean;

  // relationships
  @BelongsTo(() => User)
  user!: User;
}
