import { IUser, IUserResponse, IUserResponses } from "models/user.model";
import { requestType } from "services";
import axios from "axios";


export const UserService = {
  list: (): Promise<IUserResponses> => requestType.get("/api/users"),
  details: (code: string): Promise<IUserResponse> =>
    requestType.get(`/api/users/${code}`),
  create: (user: IUser): Promise<IUserResponse> =>
    requestType.post(`/api/users`, user),
  update: (user: IUser): Promise<IUserResponse> =>
    requestType.put(`/api/users/${user.id}`, user),
  delete: (user: IUser): Promise<IUserResponse> =>
    requestType.del(`/api/users/${user.id}`, user),
  activation: (activationToken: any): Promise<IUserResponse> =>
    requestType.put(`/api/users/activation`, { activationToken }),
  upload: (id: string, user:IUser): Promise<IUserResponse> =>
    requestType.put(`/api/users/upload/${ id }`, user),
};
