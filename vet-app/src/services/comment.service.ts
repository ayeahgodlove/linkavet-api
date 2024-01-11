import {
  CommentData,
  IComment,
  ICommentResponse,
  ICommentResponses,
} from "models/comment";
import { requestType } from "services";

export const CommentService = {
  list: (postId: string): Promise<ICommentResponses> =>
    requestType.get(`/api/comments/${postId}`),
  create: (comment: CommentData): Promise<ICommentResponse> =>
    requestType.post(`/api/comments`, comment),
  update: (comment: CommentData): Promise<ICommentResponse> =>
    requestType.put(`/api/comments/${comment.parent_id}`, comment),
  delete: (comment: IComment): Promise<ICommentResponse> =>
    requestType.del(`/api/comments/${comment.id}`, comment),
};
