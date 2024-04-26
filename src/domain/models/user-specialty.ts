import { IBaseResponse } from "./base-response";

export interface IUserSpecialty {
  id: string;
  userId: string;
  specialty: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  fullname: string;
  website: string;
  yearsOfExperience: number;
  title: string;
}

export const emptyUserSpecialty: IUserSpecialty = {
  userId: "",
  specialty: "",
  id: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  fullname: "",
  website: "",
  yearsOfExperience: 0,
  title: "",
};

export interface IUserSpecialtyResponse extends IBaseResponse {
  data: IUserSpecialty | null | IUserSpecialty[];
}
