import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../../redux/store";
import { IUser } from "../../models/user.model";
import {
  loginError,
  loginSuccess,
  logoutFun,
  logoutUser,
  registerSuccess,
} from "../../redux/auth/auth.slice";
import { useToken } from "./token.hook";
import { authService } from "../../services/auth.service";

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

  const loginUserFunction = async (user: {
    email: string;
    password: string;
  }) => {
    return await authService
      .login(user)
      .then((userResponse) => {
        if (userResponse.status === 200) {
          dispatch(loginSuccess(userResponse.data.data));
          console.log("userResponse: ", userResponse);
          setToken(userResponse.data.data.token);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        dispatch(loginError(error.message));
        return false;
      });
  };

  const registerUserFunction = async (user: IUser) => {
    return await authService
      .register(user)
      .then((userResponse) => {
        if (userResponse.status === 201) {
          dispatch(registerSuccess(userResponse.data.data));
          console.log("userResponse: ", userResponse);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        dispatch(loginError(error.message));
        return false;
      });
  };

  // const registerUserFunction = useCallback(
  //   (user: IUser) => {
  //     try {
  //       dispatch(registerUser(user) as any);
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
  //   [dispatch]
  // );

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
