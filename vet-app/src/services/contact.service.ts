import { IContact, IContactResponse, IContactResponses } from "models/contact";
import { requestType } from ".";

export const contactService = {
  list: (): Promise<IContactResponses> => requestType.get("/api/contacts"),
  details: (code: string): Promise<IContactResponse> =>
    requestType.get(`/api/contacts/${code}`),
  create: async (contact: IContact): Promise<IContactResponse> =>
    requestType.post(`/api/contacts`, contact),
  update: (contact: IContact): Promise<IContactResponse> =>
    requestType.put(`/api/contacts/${contact.id}`, contact),
  delete: (contact: IContact): Promise<IContactResponse> =>
    requestType.del(`/api/contacts/${contact.id}`, contact),
};
