import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  IUserSpecialty,
  emptyUserSpecialty,
} from "models/user-specialty.model";
import {
  addUserSpecialtySuccess,
  editUserSpecialtySuccess,
  fetchUserSpecialtiesAsync,
  setActiveUserSpecialty,
} from "../redux/user-specialty.slice";
import { UserSpecialtyService } from "services/user-specialty.service";
import { useFormErrors } from "./shared/form-error.hook";
import { useUser } from "./user.hook";

const useUserSpecialty = () => {
  const userSpecialties = useSelector<IRootState, IUserSpecialty[]>(
    (state) => state.userSpecialty.userSpecialties
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.userSpecialty.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.userSpecialty.initialFetch
  );
  const userSpecialty = useSelector<IRootState, IUserSpecialty>(
    (state) => state.userSpecialty.userSpecialty
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadUserSpecialties = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchUserSpecialtiesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addUserSpecialty = async (userSpecialty: IUserSpecialty) => {
    return await UserSpecialtyService.create(userSpecialty)
      .then((userSpecialtyResponse) => {
        dispatch(addUserSpecialtySuccess(userSpecialtyResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setUserSpecialty = (userSpecialty: IUserSpecialty) => {
    dispatch(setActiveUserSpecialty(userSpecialty));
  };

  const editUserSpecialty = async (userSpecialty: IUserSpecialty) => {
    return await UserSpecialtyService.update(userSpecialty)
      .then((userSpecialtyResponse) => {
        dispatch(editUserSpecialtySuccess(userSpecialtyResponse.data));
        setUserSpecialty(userSpecialtyResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const { getUser } = useUser();
  const getUserSpeciality = useCallback((userId: string) => {
    const specialty = userSpecialties.find((us) => us.userId === userId);
    if (specialty) {
      return specialty;
    }
    return emptyUserSpecialty;
  }, []);

  const getUserSpecialities = useCallback((): IUserSpecialty[] => {
    return userSpecialties.map((us) => {
      return {
        ...us,
        username: getUser(us.userId).username,
        avatar: getUser(us.userId).avatar,
      };
    });
  }, []);
  useEffect(() => {
    // loadUserSpecialtys();
  }, [
    userSpecialty,
    userSpecialties,
    isLoading,
    initialFetch,
    // loadUserSpecialtys,
  ]);

  return {
    userSpecialty,
    userSpecialties: getUserSpecialities(),
    isLoading,
    initialFetch,
    addUserSpecialty,
    editUserSpecialty,
    setUserSpecialty,
    getUserSpeciality,
    loadUserSpecialties,
  };
};

export { useUserSpecialty };
