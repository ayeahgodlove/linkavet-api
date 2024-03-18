import { IBaseResponse } from "./base-response";

export interface IUserSpecialty {
  id: string
  userId: string;
  specialty: string;
}

export const emptyUserSpecialty: IUserSpecialty = {
  userId: "",
  specialty: "",
  id: ""
};

export interface IUserSpecialtyResponse extends IBaseResponse {
  data: IUserSpecialty | null | IUserSpecialty[];
}
