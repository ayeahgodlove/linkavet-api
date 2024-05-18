import { IMail, IMailResponse, IMailResponses } from "models/mail.model";
import { requestType } from "services";

export const MailService = {
    list: (): Promise<IMailResponses> => requestType.get("/api/mails"),
    details: (code: string): Promise<IMailResponse> => requestType.get(`/api/mails/${code}`),
    create: (mail: IMail): Promise<IMailResponse> => requestType.post(`/api/mails`, mail),
    update: (mail: IMail): Promise<IMailResponse> =>
    requestType.put(`/api/mails/${mail.id}`, mail),
  delete: (mail: IMail): Promise<IMailResponse> =>
    requestType.del(`/api/mails/${mail.id}`, mail),
}