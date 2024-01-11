import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IStore {
  id: string;
  name: string;
  location: string;
  imageBannerUrl: string;
  userId: string;
}

export interface StoreFormData extends FormData {
  id: string; // Assuming the ID is a string, adjust the type as needed
}

export const emptyStore: IStore = {
  id: "",
  userId: "",
  name: "",
  location: "",
  imageBannerUrl: "",
};

export interface IStoreState extends IBaseState {
  readonly stores: IStore[];
  readonly store: IStore;
}

export interface IStoreResponse extends IResponseBase {
  data: IStore;
}

export interface IStoreResponses extends IResponseBase {
  data: IStore[];
}
