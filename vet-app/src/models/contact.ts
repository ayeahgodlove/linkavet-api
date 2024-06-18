import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IContact {
  id: string;
  name: string;
  subject: string;
  email: string;
  message: string;
}

export const emptyContact: IContact = {
  id: "",
  name: "",
  subject: "",
  email: "",
  message: ""
};

export interface IContactState extends IBaseState {
  readonly contacts: IContact[];
  readonly contact: IContact;
}

export interface IContactResponse extends IResponseBase {
  data: IContact;
}

export interface IContactResponses extends IResponseBase {
  data: IContact[];
}

