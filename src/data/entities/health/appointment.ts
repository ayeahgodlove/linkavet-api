import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user";
import { IAppointment } from "../../../domain/models/health/appointment";
import { STATUS } from "../../../domain/models/shared/status.enum";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "appointment",
  modelName: "Appointment",
})
export class Appointment extends Model<IAppointment> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  // foreign key
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  userId!: string; //targets among users with vet role

  // foreign key
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  doctorId!: string; //targets among users with doctors role

  @Column
  appointmentDate!: Date;

  @Column
  appointmentTime!: Date;

  @Column
  isConfirmed!: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  contact!: string;

  @Column({
    type: DataType.ENUM(STATUS.APPROVED, STATUS.PENDING, STATUS.CANCELED),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  symptoms!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  roomId!: string;

  @BelongsTo(() => User)
  user!: User;
}
