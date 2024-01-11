import { IDocument, IDocumentResponse } from "models/document";
import { requestType } from "services";

export const DocumentService = {
  list: (): Promise<IDocument[]> => requestType.get("/api/documents"),
  details: (code: string): Promise<IDocumentResponse> =>
    requestType.get(`/api/documents/${code}`),
  create: (user: IDocument): Promise<IDocumentResponse> =>
    requestType.post(`/api/documents`, user),
  update: (document: IDocument): Promise<IDocumentResponse> =>
    requestType.put(`/api/documents/${document.id}`, document),
  delete: (document: IDocument): Promise<IDocumentResponse> =>
    requestType.del(`/api/documents/${document.id}`, document),
};
