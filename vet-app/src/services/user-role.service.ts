import { IUserRole, IUserRoleResponse, IUserRoleResponses } from "models/user-role.model";
import { requestType } from "services";

export const UserRoleService = {
    list: (): Promise<IUserRoleResponses> => requestType.get("/api/user-roles"),
    details: (code: string): Promise<IUserRoleResponse> => requestType.get(`/api/user-roles/${code}`),
    create: (userRole: IUserRole): Promise<IUserRoleResponse> => requestType.post(`/api/user-roles`, userRole),
    update: (userRole: IUserRole): Promise<IUserRoleResponse> =>
    requestType.put(`/api/user-roles/${userRole.userId}`, userRole),
  delete: (userRole: IUserRole): Promise<IUserRoleResponse> =>
    requestType.del(`/api/user-roles/${userRole.userId}`, userRole),
}