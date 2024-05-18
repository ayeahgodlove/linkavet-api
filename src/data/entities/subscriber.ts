import {
  Table,
  Model,
  Column,
  DataType,
} from "sequelize-typescript";
import { ISubscriber } from "../../domain/models/subscriber";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "subscriber",
})
export class Subscriber extends Model<ISubscriber> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  email!: string;
}