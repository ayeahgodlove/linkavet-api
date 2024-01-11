import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { ITag } from "models/tag.model";
import {
  addTagSuccess,
  editTagSuccess,
  fetchTagsAsync,
  setActiveTag,
} from "../redux/tag.slice";
import { TagService } from "services/tag.service";
import { useFormErrors } from "./shared/form-error.hook";
const useTag = () => {
  const tags = useSelector<IRootState, ITag[]>((state) => state.tag.tags);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.tag.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.tag.initialFetch
  );
  const tag = useSelector<IRootState, ITag>((state) => state.tag.tag);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadTags = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchTagsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addTag = async (tag: ITag) => {
    return await TagService.create(tag)
      .then((tagResponse) => {
        dispatch(addTagSuccess(tagResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setTag = (tag: ITag) => {
    dispatch(setActiveTag(tag));
  };

  const editTag = async (tag: ITag) => {
    return await TagService.update(tag)
      .then((tagResponse) => {
        dispatch(editTagSuccess(tagResponse.data));
        setTag(tagResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    loadTags();
  }, [tag, tags, isLoading, initialFetch, loadTags]);

  return {
    tag,
    tags,
    isLoading,
    initialFetch,
    addTag,
    editTag,
    setTag,
  };
};

export { useTag };
