import { IRole, IRoleResponse, IRoleResponses } from "models/role.model";
import { requestType } from "services";

export const RoleService = {
    list: (): Promise<IRoleResponses> => requestType.get("/api/roles"),
    details: (code: string): Promise<IRoleResponse> => requestType.get(`/api/roles/${code}`),
    create: (role: IRole): Promise<IRoleResponse> => requestType.post(`/api/roles`, role),
    update: (role: IRole): Promise<IRoleResponse> =>
    requestType.put(`/api/roles/${role.id}`, role),
  delete: (role: IRole): Promise<IRoleResponse> =>
    requestType.del(`/api/roles/${role.id}`, role),
}