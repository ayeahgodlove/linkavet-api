import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IContact } from "../../domain/models/contact";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "contact",
})
export class Contact extends Model<IContact> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
  })
  subject!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: false,
  })
  email!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message!: string;
}
