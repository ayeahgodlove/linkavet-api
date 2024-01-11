import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IRootState } from "redux/store";
import { setTokenAction } from "redux/auth/token.slice";

const useToken = () => {
  const token = useSelector<IRootState, null | string>(
    (state) => state.token.token
  );

  const dispatch = useDispatch();

  const setToken = (token: null | string) => {
    dispatch(setTokenAction(token));
  };

  useEffect(() => {
  }, [token]);

  return {
    token,
    setToken,
  };
};

export { useToken };
