import {
  IAppointment,
  IAppointmentResponse,
  IAppointmentResponses,
} from "models/health/appointment";
import { requestType } from "services";

export const AppointmentService = {
  list: (): Promise<IAppointmentResponses> =>
    requestType.get("/api/appointments"),
  details: (code: string): Promise<IAppointmentResponse> =>
    requestType.get(`/api/appointments/${code}`),
  create: (appointment: IAppointment): Promise<IAppointmentResponse> =>
    requestType.post(`/api/appointments`, appointment),
  update: (appointment: IAppointment): Promise<IAppointmentResponse> =>
    requestType.put(`/api/appointments/${appointment.id}`, appointment),
  delete: (appointment: IAppointment): Promise<IAppointmentResponse> =>
    requestType.del(`/api/appointments/${appointment.id}`, appointment),
};
