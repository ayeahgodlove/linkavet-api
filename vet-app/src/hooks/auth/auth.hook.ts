import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IUser } from "models/user.model";
import {
  loginUser,
  logoutFun,
  logoutUser,
  registerUser,
} from "redux/auth/auth.slice";
import { useToken } from "./token.hook";

const useAuth = () => {
  const user = useSelector<IRootState, IUser>((state) => state.auth.user);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.auth.isLoading
  );
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.isAuthenticated
  );

  const { setToken } = useToken();

  const dispatch = useDispatch();
  const logoutUserFunction = useCallback(() => {
    dispatch(logoutUser());
    dispatch(logoutFun() as any);
  }, [dispatch]);

  const loginUserFunction = useCallback(
    (userObj: { email: string; password: string }) => {
      dispatch(
        loginUser({ email: userObj.email, password: userObj.password }) as any
      );
      setToken(user.token!);
      // dispatch(setUser())
    },
    [dispatch]
  );

  const registerUserFunction = useCallback(
    (user: IUser) => {
      try {
        dispatch(registerUser(user) as any);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [dispatch]
  );

  useEffect(() => {}, [
    isLoading,
    isAuthenticated,
    user,
    logoutUserFunction,
    loginUserFunction,
    registerUserFunction,
  ]);
  return {
    user,
    logoutUserFunction,
    loginUserFunction,
    registerUserFunction,
    isLoading,
    isAuthenticated,
  };
};

export { useAuth };
