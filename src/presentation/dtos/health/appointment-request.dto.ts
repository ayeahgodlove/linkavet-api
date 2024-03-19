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

  @IsDate()
  appointmentDate: Date;

  @IsDate()
  appointmentTime: Date;

  @IsNumber()
  durationMinutes: number;

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

  constructor(data: IAppointment) {
    this.userId = data.userId;
    this.doctorId = data.doctorId;
    this.appointmentDate = data.appointmentDate;
    this.appointmentTime = data.appointmentTime;
    this.durationMinutes = data.durationMinutes;
    this.isConfirmed = data.isConfirmed;
    this.fullName = data.fullName;
    this.email = data.email;
    this.contact = data.contact;
    this.symptoms = data.symptoms;
    this.status = data.status
  }

  toData(): IAppointment {
    return {
      ...emptyAppointment,
      id: nanoid(10),
      userId: this.userId,
      doctorId: this.doctorId,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      durationMinutes: this.durationMinutes,
      isConfirmed: this.isConfirmed,
      fullName: this.fullName,
      email: this.email,
      contact: this.contact,
      symptoms: this.symptoms,
      status: this.status
    };
  }

  toUpdateData(data: IAppointment): IAppointment {
    return {
      id: data.id,
      userId: data.userId,
      doctorId: data.doctorId,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      durationMinutes: data.durationMinutes,
      isConfirmed: data.isConfirmed,
      fullName: data.fullName,
      email: data.email,
      contact: data.contact,
      symptoms: data.symptoms,
      status: data.status
    };
  }
}
