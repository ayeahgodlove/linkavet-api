import { IBaseResponse } from "./base-response";

export interface ISubscriber {
  id: string;
  email: string;
}

export const emptySubscriber: ISubscriber = {
  id: "",
  email: "",
};

export interface ISubscriberResponse extends IBaseResponse {
  data: ISubscriber | null | ISubscriber[];
}
