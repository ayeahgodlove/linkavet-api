import { IBaseResponse } from "./base-response";

export interface IUserSpecialty {
  id: string
  userId: string;
  specialty: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}

export const emptyUserSpecialty: IUserSpecialty = {
  userId: "",
  specialty: "",
  id: "",
  facebook: "",
  twitter: "",
  linkedin: ""
};

export interface IUserSpecialtyResponse extends IBaseResponse {
  data: IUserSpecialty | null | IUserSpecialty[];
}
