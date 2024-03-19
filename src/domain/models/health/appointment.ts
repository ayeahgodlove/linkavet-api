import { IBaseResponse } from "../base-response";
import { STATUS } from "../shared/status.enum";

export interface IAppointment {
  id: string;
  userId: string;
  doctorId: string;
  appointmentDate: Date;
  appointmentTime: Date;
  isConfirmed: boolean;
  fullName: string; 
  email: string;
  contact: string;
  symptoms: string;
  roomId: string;
  status: STATUS;
}

export const emptyAppointment: IAppointment = {
  id: "",
  isConfirmed: false,
  userId: "",
  doctorId: "",
  appointmentDate: new Date(),
  appointmentTime: new Date(),
  fullName: "",
  email: "",
  contact: "",
  symptoms: "",
  status: STATUS.PENDING,
  roomId: ""
};

export interface IAppointmentResponse extends IBaseResponse {
  data: IAppointment | null | IAppointment[];
}
