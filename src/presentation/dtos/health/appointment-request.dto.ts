// src/presentation/dtos/appointment-request.dto.ts

import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { nanoid } from "nanoid";
import {
  IAppointment,
  emptyAppointment,
} from "../../../domain/models/health/appointment";
import { STATUS } from "../../../domain/models/shared/status.enum";

export class AppointmentRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  doctorId: string;

  // @IsDate()
  appointmentDate: Date;

  // @IsDate()
  appointmentTime: Date;

  @IsBoolean()
  isConfirmed: boolean;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsString()
  symptoms: string;

  status: STATUS;

  roomId: string;

  constructor(data: IAppointment) {
    this.userId = data.userId;
    this.doctorId = data.doctorId;
    this.appointmentDate = data.appointmentDate;
    this.appointmentTime = data.appointmentTime;
    this.isConfirmed = data.isConfirmed;
    this.fullName = data.fullName;
    this.email = data.email;
    this.contact = data.contact;
    this.symptoms = data.symptoms;
    this.status = data.status
    this.roomId = data.roomId
  }

  toData(): IAppointment {
    return {
      ...emptyAppointment,
      id: nanoid(10),
      userId: this.userId,
      doctorId: this.doctorId,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      isConfirmed: this.isConfirmed,
      fullName: this.fullName,
      email: this.email,
      contact: this.contact,
      symptoms: this.symptoms,
      status: this.status,
      roomId: this.roomId
    };
  }

  toUpdateData(data: IAppointment): IAppointment {
    return {
      id: data.id,
      userId: data.userId,
      doctorId: data.doctorId,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      isConfirmed: data.isConfirmed,
      fullName: data.fullName,
      email: data.email,
      contact: data.contact,
      symptoms: data.symptoms,
      status: data.status,
      roomId: data.roomId
    };
  }
}
