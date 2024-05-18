import { ISubscriber, ISubscriberResponse, ISubscriberResponses } from "models/subscriber.model";
import { requestType } from "services";

export const SubscriberService = {
    list: (): Promise<ISubscriberResponses> => requestType.get("/api/subscribers"),
    details: (code: string): Promise<ISubscriberResponse> => requestType.get(`/api/subscribers/${code}`),
    create: (subscriber: ISubscriber): Promise<ISubscriberResponse> => requestType.post(`/api/subscribers`, subscriber),
    update: (subscriber: ISubscriber): Promise<ISubscriberResponse> =>
    requestType.put(`/api/subscribers/${subscriber.id}`, subscriber),
  delete: (subscriber: ISubscriber): Promise<ISubscriberResponse> =>
    requestType.del(`/api/subscribers/${subscriber.id}`, subscriber),
}