import { ISpecialty, ISpecialtyResponse, ISpecialtyResponses } from "models/specialty.model";
import { requestType } from "services";

export const SpecialtyService = {
    list: (): Promise<ISpecialtyResponses> => requestType.get("/api/specialties"),
    details: (code: string): Promise<ISpecialtyResponse> => requestType.get(`/api/specialties/${code}`),
    create: (userSpecialty: ISpecialty): Promise<ISpecialtyResponse> => requestType.post(`/api/specialties`, userSpecialty),
    update: (userSpecialty: ISpecialty): Promise<ISpecialtyResponse> =>
    requestType.put(`/api/specialties/${userSpecialty.id}`, userSpecialty),
  delete: (userSpecialty: ISpecialty): Promise<ISpecialtyResponse> =>
    requestType.del(`/api/specialties/${userSpecialty.id}`, userSpecialty),
}