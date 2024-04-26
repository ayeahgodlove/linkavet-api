import { IUser, IUserResponse } from "models/user.model";
import axios from "axios";
import { API_URL } from "config/constant";

export const authService = {
  register: async (user: IUser): Promise<any> =>
    await axios.post(`${API_URL}/api/users`, user),
  login: async (user: { email: string; password: string }): Promise<any> =>
    await axios.post(`${API_URL}/auth/login`, user),
  logout: async (): Promise<any> => await axios.get(`${API_URL}/auth/logout`),
};
