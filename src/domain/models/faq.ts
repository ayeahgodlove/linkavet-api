import { IBaseResponse } from "./base-response";

export interface IFaq {
  id: string;
  question: string;
  answer: string;
}

export const emptyFaq: IFaq = {
  id: "",
  question: "",
  answer: "",
};

export interface IFaqResponse extends IBaseResponse {
  data: IFaq | null | IFaq[];
}
