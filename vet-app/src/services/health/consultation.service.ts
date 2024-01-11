
import { IConsultation, IConsultationResponse, IConsultationResponses } from "models/health/consultation";
import { requestType } from "services";

export const ConsultationService = {
  list: (): Promise<IConsultationResponses> => requestType.get("/api/consultations"),
  details: (code: string): Promise<IConsultationResponse> =>
    requestType.get(`/api/consultations/${code}`),
  create: (consultation: IConsultation): Promise<IConsultationResponse> =>
    requestType.post(`/api/consultations`, consultation),
  update: (consultation: IConsultation): Promise<IConsultationResponse> =>
    requestType.put(`/api/consultations/${consultation.id}`, consultation),
  delete: (consultation: IConsultation): Promise<IConsultationResponse> =>
    requestType.del(`/api/consultations/${consultation.id}`, consultation),
};
