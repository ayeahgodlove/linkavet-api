import axios from "axios";
import { IEvent, IEventResponse, IEventResponses } from "models/event.model";
import { requestType } from "services";

export const EventService = {
  list: (calendars: string[]): Promise<IEventResponses> =>
    axios.get("/api/calendar/events", { params: calendars }),
  create: (event: IEvent): Promise<IEventResponse> =>
    requestType.post(`/api/calendar/events`, event),
  update: (event: IEvent): Promise<IEventResponse> =>
    requestType.put(`/api/calendar/events/${event.id}`, event),
  delete: (event: IEvent): Promise<IEventResponse> =>
    requestType.del(`/api/calendar/events/${event.id}`, event),
};
