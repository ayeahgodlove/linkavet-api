import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

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
  verified: false,
};

export interface IUserDocState extends IBaseState {
  readonly userDocs: IUserDoc[];
  readonly userDoc: IUserDoc;
}

export interface IUserDocResponse extends IResponseBase {
  data: IUserDoc;
}

export interface IUserDocResponses extends IResponseBase {
  data: IUserDoc[];
}
