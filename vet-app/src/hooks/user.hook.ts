import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IUser, emptyUser } from "models/user.model";
import {
  addUserSuccess,
  editUserSuccess,
  fetchUsersAsync,
  setActiveUser,
} from "../redux/user.slice";
import { UserService } from "services/user.service";

const useUser = () => {
  const users = useSelector<IRootState, IUser[]>((state) => state.user.users);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.user.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.user.initialFetch
  );
  const user = useSelector<IRootState, IUser>((state) => state.user.user);

  const dispatch = useDispatch();

  const loadUsers = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchUsersAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addUser = async (user: IUser) => {
    return await UserService.create(user)
      .then((userResponse) => {
        dispatch(addUserSuccess({ ...user, ...userResponse.data }));
        return userResponse.success;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const setUser = (user: IUser) => {
    dispatch(setActiveUser(user));
  };

  const editUser = async (user: IUser) => {
    return await UserService.update(user)
      .then((userResponse) => {
        dispatch(editUserSuccess(userResponse.data));
        setUser(userResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
  const getUser = (userId: string) => {
    const user = users.find((p) => p.id === userId);
    if (!user) {
      return emptyUser;
    }
    return user;
  };

  useEffect(() => {
    // loadUsers();
  }, [user, users, isLoading, initialFetch, loadUsers]);

  return {
    user,
    users,
    isLoading,
    initialFetch,
    addUser,
    editUser,
    setUser,
    getUser,
  };
};

export { useUser };
