import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addCommentSuccess,
  editCommentSuccess,
  fetchcommentError,
  fetchcommentSuccess,
  setActiveComment,
} from "../redux/comment.slice";
import { CommentService } from "services/comment.service";
import { CommentData, IComment } from "models/comment";
const useComment = () => {
  const comments = useSelector<IRootState, IComment[]>(
    (state) => state.comment.comments
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.comment.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.comment.initialFetch
  );
  const comment = useSelector<IRootState, IComment>(
    (state) => state.comment.comment
  );

  const errors = useSelector<IRootState, string>(
    (state) => state.comment.errors
  )

  const dispatch = useDispatch();

  const loadComments = useCallback(
    async (postId: string) => {
      return await CommentService.list(postId)
        .then((response) => {
          dispatch(fetchcommentSuccess(response.data));
          return true;
        })
        .catch((error) => {
          dispatch(fetchcommentError(error));
          return false;
        });
    },
    [dispatch]
  );

  const addComment = async (comment: CommentData) => {
    return await CommentService.create(comment)
      .then((commentResponse) => {
        dispatch(addCommentSuccess(commentResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const setComment = (comment: IComment) => {
    dispatch(setActiveComment(comment));
  };

  const editComment = async (comment: CommentData) => {
    return await CommentService.update(comment)
      .then((commentResponse) => {
        dispatch(editCommentSuccess(commentResponse.data));
        setComment(commentResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  useEffect(() => {}, [comment, comments, isLoading, initialFetch]);

  return {
    comment,
    comments,
    isLoading,
    initialFetch,
    addComment,
    editComment,
    setComment,
    loadComments,
    errors
  };
};

export { useComment };
