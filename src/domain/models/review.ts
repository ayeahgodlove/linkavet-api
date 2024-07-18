import { IBaseResponse } from "./base-response";

export interface IReview {
  id: string;
  userId?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  toggle: boolean;
}

export const emptyReview: IReview = {
  id: "",
  rating: 0,
  comment: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  toggle: false,
};

export interface IReviewResponse extends IBaseResponse {
  data: IReview | null | IReview[];
}
