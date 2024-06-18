import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../redux/store";
import { IUserDoc } from "../models/user-doc.model";
import {
  addUserDocSuccess,
  editUserDocSuccess,
  fetchUserDocsAsync,
  setActiveUserDoc,
} from "../redux/user-doc.slice";
import { UserDocService } from "../services/user-doc.service";
import { useFormErrors } from "./shared/form-error.hook";
const useUserDoc = () => {
  const userDocs = useSelector<IRootState, IUserDoc[]>((state) => state.userDoc.userDocs);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.userDoc.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.userDoc.initialFetch
  );
  const userDoc = useSelector<IRootState, IUserDoc>((state) => state.userDoc.userDoc);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadUserDocs = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchUserDocsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addUserDoc = async (userDoc: IUserDoc) => {
    return await UserDocService.create(userDoc)
      .then((userDocResponse) => {
        dispatch(addUserDocSuccess(userDocResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setUserDoc = (userDoc: IUserDoc) => {
    dispatch(setActiveUserDoc(userDoc));
  };

  const editUserDoc = async (userDoc: IUserDoc) => {
    return await UserDocService.update(userDoc)
      .then((userDocResponse) => {
        dispatch(editUserDocSuccess(userDocResponse.data));
        setUserDoc(userDocResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    // loadUserDocs();
  }, [userDoc, userDocs, isLoading, initialFetch]);

  return {
    userDoc,
    userDocs,
    isLoading,
    initialFetch,
    addUserDoc,
    editUserDoc,
    setUserDoc,
  };
};

export { useUserDoc };
