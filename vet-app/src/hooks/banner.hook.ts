import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { useFormErrors } from "./shared/form-error.hook";
import { IRootState } from "../redux/store";
import { bannerService } from "../services/banner.service";
import { useToken } from "./auth/token.hook";
import { IBanner } from "models/banner";
import {
  addBannerSuccess,
  deleteBanner,
  editBannerSuccess,
  fetchBannersAsync,
  setActiveBanner,
} from "redux/banner.slice";

const useBanner = () => {
  const banners = useSelector<IRootState, IBanner[]>(
    (state) => state.banner.banners
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.banner.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.banner.initialFetch
  );
  const banner = useSelector<IRootState, IBanner>(
    (state) => state.banner.banner
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();
  const { token } = useToken();

  const loadBanners = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchBannersAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addBanner = async (banner: IBanner) => {
    return await bannerService
      .create(banner)
      .then((bannerResponse) => {
        dispatch(addBannerSuccess(bannerResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const delBanner = async (banner: IBanner) => {
    return await bannerService
      .delete(banner)
      .then((resp) => {
        console.log("resp: ", resp);
        dispatch(deleteBanner(banner));
        return true;
      })
      .catch((error) => {
        console.log("error: ", error);
        return false;
      });
  };
  const setBanner = (banner: IBanner) => {
    dispatch(setActiveBanner(banner));
  };

  const editBanner = async (banner: IBanner) => {
    return await bannerService
      .update(banner)
      .then((bannerResponse) => {
        dispatch(editBannerSuccess(bannerResponse.data));
        setBanner(bannerResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  useEffect(() => {
    loadBanners();
  }, [banner, banners, isLoading, initialFetch, loadBanners]);

  return {
    banner,
    banners,
    isLoading,
    initialFetch,
    addBanner,
    editBanner,
    setBanner,
    delBanner
  };
};

export { useBanner };
