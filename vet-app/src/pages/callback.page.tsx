import Spinner from "components/utilities/Spinner";
import { useAuth } from "hooks/auth/auth.hook";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { initialDataAsync } from "redux/action/initial.action";

const CallbackPage: React.FC = () => {
  const {isLoading, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  
  if (isLoading) {
   return <>
      <Spinner />
    </>;
  }

  // load initial data into the redux store here
  if (isAuthenticated && user) {
    setTimeout(() =>   {
      dispatch(initialDataAsync() as any);
    }, 3000);
  }
  return <Navigate to={"/dashboard"} />;
};

export default CallbackPage;
