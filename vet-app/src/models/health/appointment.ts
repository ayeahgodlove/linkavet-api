import { IBaseState } from "models/base-state.model";
import { IResponseBase } from "models/response-base.model";

export interface IAppointment {
  id: string;
  petOwnerId: string;
  vetDoctorId: string;
  appointmentDateTime: Date;
  durationMinutes: number;
  isConfirmed: boolean;
}

export const emptyAppointment: IAppointment = {
  id: "",
  petOwnerId: "",
  vetDoctorId: "",
  appointmentDateTime: new Date(),
  durationMinutes: 0,
  isConfirmed: false,
};

export interface IAppointmentState extends IBaseState {
  readonly appointments: IAppointment[];
  readonly appointment: IAppointment;
}

export interface IAppointmentResponse extends IResponseBase {
  data: IAppointment;
}

export interface IAppointmentResponses extends IResponseBase {
  data: IAppointment[];
}
