import { IBaseResponse } from "./base-response";

export interface IUserDoc {
  id: string;
  userId: string;
  photo: string;
  idCardFront: string; 
  idCardBack: string;
  license: string; 
  diploma: string; 
  verified: boolean;
}

export const emptyUserDoc: IUserDoc = {
  id: "",
  userId: "",
  photo: "",
  idCardFront: "",
  idCardBack: "",
  license: "",
  diploma: "",
  verified: false
};

export interface IUserDocResponse extends IBaseResponse {
  data: IUserDoc | null | IUserDoc[];
}
