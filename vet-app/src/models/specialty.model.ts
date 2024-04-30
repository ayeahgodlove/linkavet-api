import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface ISpecialty {
  specialty: string;
  userId: string;
  id: string;
  username?: string;
  avatar?: string;
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
  id: "",
  specialty: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  fullname: "",
  title: "",
  website: "",
  yearsOfExperience: 0
};

export interface ISpecialtyState extends IBaseState {
  readonly specialties: ISpecialty[];
  readonly specialty: ISpecialty;
}

export interface ISpecialtyResponse extends IResponseBase {
  data: ISpecialty;
}

export interface ISpecialtyResponses extends IResponseBase {
  data: ISpecialty[];
}
