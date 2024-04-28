import { IBaseResponse } from "./base-response";

export interface IEvent {
  id: string;
  userId: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  display?: string;
  extendedProps: {
    calendar: string;
    guests: string[];
    location: string;
    description: string;
  };
}

export const emptyEvent: IEvent = {
  id: "",
  title: "",
  userId: "",
  start: new Date(),
  end: new Date(),
  allDay: false,
  extendedProps: {
    calendar: "",
    guests: [],
    location: "",
    description: "",
  },
};

export interface IEventResponse extends IBaseResponse {
  data: IEvent | null | IEvent[];
}
