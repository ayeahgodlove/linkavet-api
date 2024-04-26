import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { addImageSuccess } from "redux/shared/image.slice";

const useImage = () => {
  const images = useSelector<IRootState, string[]>(
    (state) => state.image.images
  );

  const dispatch = useDispatch();

  const addImage = async (image: string) => {
    dispatch(addImageSuccess(image));
  };

  useEffect(() => {
    // loadImages();
  }, [images]);

  return {
    addImage,
    images
  };
};

export { useImage };
