import { IUser, IUserResponse } from "models/user.model";
import axios from "axios";

export const authService = {
  register: async (user: IUser): Promise<IUserResponse> =>
    await axios.post(`/api/users`, user),
  login: async (user: {
    email: string;
    password: string;
  }): Promise<any> => await axios.post("/auth/login", user),
  logout: async (): Promise<any> => await axios.get("/auth/logout"),
};
