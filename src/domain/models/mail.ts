import { IBaseResponse } from "./base-response";
import { MAIL_STATUS } from "./shared/status.enum";

export interface IMail {
  id: string;
  senderEmail: string;
  receiverEmails: string[];
  type: string;
  headline: string;
  status: MAIL_STATUS;
  cta: string;
  content: string;
  media: string[];
}

export const emptyMail: IMail = {
  id: "",
  senderEmail: "",
  receiverEmails: [],
  type: "",
  headline: "",
  status: MAIL_STATUS.DRAFT,
  cta: "",
  content: "",
  media: []
};

export interface IMailResponse extends IBaseResponse {
  data: IMail | null | IMail[];
}
