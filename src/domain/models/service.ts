import { IBaseResponse } from "./base-response";

export interface IService {
  id: string;
  title: string;
  description: string;
  fileName: string;
  price: number;
  slug: string;
  short_description: string
}

export const emptyService: IService = {
  id: "",
  title: "",
  description: "",
  fileName: "",
  price: 0,
  slug: "",
  short_description: ""
};

export interface IServiceResponse extends IBaseResponse {
  data: IService | null | IService[];
}
