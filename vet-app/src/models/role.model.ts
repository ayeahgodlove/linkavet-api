import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IRole {
  id: string;
  name: string;
}

export const emptyRole: IRole = {
  id: "",
  name: "",
};

export interface IRoleState extends IBaseState {
  readonly roles: IRole[];
  readonly role: IRole;
}

export interface IRoleResponse extends IResponseBase {
  data: IRole;
}

export interface IRoleResponses extends IResponseBase {
  data: IRole[];
}
