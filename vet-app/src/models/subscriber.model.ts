import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface ISubscriber {
  id: string;
  email: string;
  createdAt: Date;
}

export const emptySubscriber: ISubscriber = {
  id: "",
  email: "",
  createdAt: new Date(),
};

export interface ISubscriberState extends IBaseState {
  readonly subscribers: ISubscriber[];
  readonly subscriber: ISubscriber;
}

export interface ISubscriberResponse extends IResponseBase {
  data: ISubscriber;
}

export interface ISubscriberResponses extends IResponseBase {
  data: ISubscriber[];
}
