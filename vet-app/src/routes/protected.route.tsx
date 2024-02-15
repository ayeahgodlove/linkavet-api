import { useAuth } from "hooks/auth/auth.hook";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  // console.log("user roles: ", user.roles)

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles && !roles.some(role => user.roles.map(ur => ur.name).includes(role));
  if (!hasAccess) {
    // Redirect to unauthorized if user doesn't have required roles
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
