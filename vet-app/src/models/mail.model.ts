import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";
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
  media: [],
};

export interface IMailState extends IBaseState {
  readonly mails: IMail[];
  readonly mail: IMail;
}

export interface IMailResponse extends IResponseBase {
  data: IMail;
}

export interface IMailResponses extends IResponseBase {
  data: IMail[];
}
