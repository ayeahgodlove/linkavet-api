import { IBaseResponse } from "./base-response";

export interface IEvent {
  id: string;
  userId: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  url: string;
}

export const emptyEvent: IEvent = {
  id: "",
  title: "",
  userId: "",
  start: new Date(),
  end: new Date(),
  description: "",
  url: "",
};

export interface IEventResponse extends IBaseResponse {
  data: IEvent | null | IEvent[];
}
