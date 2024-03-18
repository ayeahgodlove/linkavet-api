import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IUserSpecialty {
  specialty: string;
  userId: string;
  id: string;
  username?: string
}

export const emptyUserSpecialty: IUserSpecialty = {
  userId: "",
  id: "",
  specialty: "",
};

export interface IUserSpecialtyState extends IBaseState {
  readonly userSpecialties: IUserSpecialty[];
  readonly userSpecialty: IUserSpecialty;
}

export interface IUserSpecialtyResponse extends IResponseBase {
  data: IUserSpecialty;
}

export interface IUserSpecialtyResponses extends IResponseBase {
  data: IUserSpecialty[];
}
