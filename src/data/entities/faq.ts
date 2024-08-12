import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IFaq } from "../../domain/models/faq";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "faq",
  modelName: "Faq",
})
export class Faq extends Model<IFaq> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  question!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  answer!: string;
}
