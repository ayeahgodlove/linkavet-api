import { IUserSpecialty, IUserSpecialtyResponse, IUserSpecialtyResponses } from "models/user-specialty.model";
import { requestType } from "services";

export const UserSpecialtyService = {
    list: (): Promise<IUserSpecialtyResponses> => requestType.get("/api/user-specialties"),
    details: (code: string): Promise<IUserSpecialtyResponse> => requestType.get(`/api/user-specialties/${code}`),
    create: (userSpecialty: IUserSpecialty): Promise<IUserSpecialtyResponse> => requestType.post(`/api/user-specialties`, userSpecialty),
    update: (userSpecialty: IUserSpecialty): Promise<IUserSpecialtyResponse> =>
    requestType.put(`/api/user-specialties/${userSpecialty.userId}`, userSpecialty),
  delete: (userSpecialty: IUserSpecialty): Promise<IUserSpecialtyResponse> =>
    requestType.del(`/api/user-specialties/${userSpecialty.userId}`, userSpecialty),
}