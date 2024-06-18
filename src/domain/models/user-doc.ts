import { IBaseResponse } from "./base-response";

export interface IUserDoc {
  id: string;
  userId: string;
  photo: string;
  idCard: string;
  license: string; 
  diploma: string; 
  verified: boolean;
}

export const emptyUserDoc: IUserDoc = {
  id: "",
  userId: "",
  photo: "",
  idCard: "",
  license: "",
  diploma: "",
  verified: false
};

export interface IUserDocResponse extends IBaseResponse {
  data: IUserDoc | null | IUserDoc[];
}
