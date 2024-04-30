import { IBaseResponse } from "./base-response";

export interface ISpecialty {
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

export const emptySpecialty: ISpecialty = {
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

export interface ISpecialtyResponse extends IBaseResponse {
  data: ISpecialty | null | ISpecialty[];
}
