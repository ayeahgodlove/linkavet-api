import { IBaseResponse } from "./base-response";

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
  message: "",
};

export interface IContactResponse extends IBaseResponse {
  data: IContact | null | IContact[];
}
