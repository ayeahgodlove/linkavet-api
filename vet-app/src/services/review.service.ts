import {
  IReview,
  IReviewResponse,
  IReviewResponses,
} from "models/review.model";
import { requestType } from "services";

export const ReviewService = {
  list: (): Promise<IReviewResponses> => requestType.get("/api/reviews"),
  details: (code: string): Promise<IReviewResponse> =>
    requestType.get(`/api/reviews/${code}`),
  create: (review: IReview): Promise<IReviewResponse> =>
    requestType.post(`/api/reviews`, review),
  update: (review: IReview): Promise<IReviewResponse> =>
    requestType.put(`/api/reviews/${review.id}`, review),
  delete: (review: IReview): Promise<IReviewResponse> =>
    requestType.del(`/api/reviews/${review.id}`, review),
};
