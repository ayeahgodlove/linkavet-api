import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IReview {
  id: string;
  rating: number;
  userId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyReview: IReview = {
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  rating: 0,
  userId: "",
  comment: "",
};

export interface IReviewState extends IBaseState {
  readonly reviews: IReview[];
  readonly review: IReview;
}

export interface IReviewResponse extends IResponseBase {
  data: IReview;
}

export interface IReviewResponses extends IResponseBase {
  data: IReview[];
}
