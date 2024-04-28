import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../redux/store";
import {
  addPostSuccess,
  editPostSuccess,
  fetchPostsAsync,
  setActivePost,
} from "../redux/post.slice";
import { PostService } from "../services/post.service";
import { IPost } from "../models/post";
import { useTag } from "./tag.hook";
const usePost = () => {
  const posts = useSelector<IRootState, IPost[]>((state) => state.post.posts);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.post.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.post.initialFetch
  );
  const post = useSelector<IRootState, IPost>((state) => state.post.post);

  const dispatch = useDispatch();

  const loadPosts = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchPostsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addPost = async (post: IPost) => {
    return await PostService.create(post)
      .then((postResponse) => {
        dispatch(addPostSuccess(postResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const setPost = (post: IPost) => {
    dispatch(setActivePost(post));
  };

  const editPost = async (post: IPost) => {
    return await PostService.update(post)
      .then((postResponse) => {
        dispatch(editPostSuccess(postResponse.data));
        setPost(postResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const {tags} = useTag()
  const getPostTags = (post: IPost): string[] => {
    return post.tags.map((tagId) => {
      const matchingTag = tags.find((tag) => tag.id === tagId);
      return matchingTag ? matchingTag.name : "Unknown Tag"; // Handle missing tags
    });
  };

  useEffect(() => {
    // loadPosts();
  }, [post, posts, isLoading, initialFetch]);

  return {
    post,
    posts,
    isLoading,
    initialFetch,
    addPost,
    editPost,
    setPost,
    getPostTags
  };
};

export { usePost };
