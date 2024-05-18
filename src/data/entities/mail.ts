import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IMail } from "../../domain/models/mail";
import { MAIL_STATUS } from "../../domain/models/shared/status.enum";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "mail",
})
export class Mail extends Model<IMail> {
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
  senderEmail!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: false,
    unique: true,
  })
  receiverEmails!: string[];

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: false,
  })
  type!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: false,
  })
  headline!: string;

  @Column({
    type: DataType.ENUM(MAIL_STATUS.DRAFT, MAIL_STATUS.SENT),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
  })
  cta!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  media!: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
  })
  content!: string;
}
