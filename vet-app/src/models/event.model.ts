import { IBaseState } from "./base-state.model";
import { IProduct } from "./product.model";
import { IResponseBase } from "./response-base.model";

// id: 1,
// url: "",
// title: "Design Review",
// start: date,
// end: nextDay,
// allDay: false,
// extendedProps: {
//   calendar: "Work",
// },

export interface IEvent {
  id: string;
  userId: string;
  url: string;
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
  userId: "",
  title: "",
  start: new Date(),
  end: new Date(),
  allDay: false,
  extendedProps: {
    calendar: "",
    guests: [],
    location: "",
    description: "",
  },
  url: ""
};

export interface IEventState extends IBaseState {
  readonly events: IEvent[];
  readonly selectedEvent: IEvent;
  readonly selectedCalendars: string[];
}

export interface IEventResponses extends IResponseBase {
  data: IEvent[];
}
export interface IEventResponse extends IResponseBase {
  data: IEvent;
}
