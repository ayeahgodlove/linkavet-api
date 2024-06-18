import {
  IUserDoc,
  IUserDocResponse,
  IUserDocResponses,
} from "models/user-doc.model";
import { requestType } from "services";

export const UserDocService = {
  list: (): Promise<IUserDocResponses> => requestType.get("/api/user-docs"),
  details: (code: string): Promise<IUserDocResponse> =>
    requestType.get(`/api/user-docs/${code}`),
  create: (userDoc: IUserDoc): Promise<IUserDocResponse> =>
    requestType.post(`/api/user-docs`, userDoc),
  update: (userDoc: IUserDoc): Promise<IUserDocResponse> =>
    requestType.put(`/api/user-docs/${userDoc.userId}`, userDoc),
  delete: (userDoc: IUserDoc): Promise<IUserDocResponse> =>
    requestType.del(`/api/user-docs/${userDoc.userId}`, userDoc),
};
