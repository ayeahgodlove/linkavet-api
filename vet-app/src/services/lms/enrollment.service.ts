import {
  IEnrollment,
  IEnrollmentResponse,
  IEnrollmentResponses,
} from "models/lms/enrollment";
import { requestType } from "services";

export const EnrollmentService = {
  list: (): Promise<IEnrollmentResponses> =>
    requestType.get("/api/enrollments"),
  details: (code: string): Promise<IEnrollmentResponse> =>
    requestType.get(`/api/enrollments/${code}`),
  create: (enrollment: IEnrollment): Promise<IEnrollmentResponse> =>
    requestType.post(`/api/enrollments`, enrollment),
  update: (enrollment: IEnrollment): Promise<IEnrollmentResponse> =>
    requestType.put(`/api/enrollments/${enrollment.id}`, enrollment),
  delete: (enrollment: IEnrollment): Promise<IEnrollmentResponse> =>
    requestType.del(`/api/enrollments/${enrollment.id}`, enrollment),
};
