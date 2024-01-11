import { ITag, ITagResponse, ITagResponses } from "models/tag.model";
import { requestType } from "services";

export const TagService = {
    list: (): Promise<ITagResponses> => requestType.get("/api/tags"),
    details: (code: string): Promise<ITagResponse> => requestType.get(`/api/tags/${code}`),
    create: (tag: ITag): Promise<ITagResponse> => requestType.post(`/api/tags`, tag),
    update: (tag: ITag): Promise<ITagResponse> =>
    requestType.put(`/api/tags/${tag.id}`, tag),
  delete: (tag: ITag): Promise<ITagResponse> =>
    requestType.del(`/api/tags/${tag.id}`, tag),
}