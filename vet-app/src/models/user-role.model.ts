import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IUserRole {
  roleId: string;
  userId: string;
  role?: string
}

export const emptyUserRole: IUserRole = {
  userId: "",
  roleId: ""
};

export interface IUserRoleState extends IBaseState {
  readonly userRoles: IUserRole[];
  readonly userRole: IUserRole;
}

export interface IUserRoleResponse extends IResponseBase {
  data: IUserRole;
}

export interface IUserRoleResponses extends IResponseBase {
  data: IUserRole[];
}
