import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { IUserSpecialty } from "../../domain/models/user-specialty";
import { User } from "./user";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user-specialty",
})
export class UserSpecialty extends Model<IUserSpecialty> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;
  
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
  })
  specialty!: string;

  @BelongsTo(() => User)
  user!: User; // Define association to User entity
}
