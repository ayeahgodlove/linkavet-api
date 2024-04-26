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
  fullname!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: false,
  })
  yearsOfExperience!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
  })
  specialty!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: false,
  })
  facebook!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    unique: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: false,
  })
  website!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: false,
  })
  twitter!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: false,
  })
  linkedin!: string;

  @BelongsTo(() => User)
  user!: User; // Define association to User entity
}
