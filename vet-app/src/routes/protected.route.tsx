import { useAuth } from "../hooks/auth/auth.hook";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  roles?: string[]; 
  children: any
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles && !roles.some(role => user.roles.map(ur => ur.name).includes(role));
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children? children : <Outlet />;
};

export default ProtectedRoute;
