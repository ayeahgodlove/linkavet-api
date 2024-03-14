import { IBaseResponse } from "./base-response";

export interface IUserSpecialty {
  userId: string;
  specialty: string;
}

export const emptyUserSpecialty: IUserSpecialty = {
  userId: "",
  specialty: "",
};

export interface IUserSpecialtyResponse extends IBaseResponse {
  data: IUserSpecialty | null | IUserSpecialty[];
}
