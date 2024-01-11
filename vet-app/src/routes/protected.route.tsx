import AppShell from "layout/app/app-shell";
import React from "react";
import { Navigate, Route, RouteProps, redirect } from "react-router-dom";

const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  element: Component,
  ...rest
}) => {
  const user = null;

  return user ? (
    <AppShell>
      <Route {...rest} element={Component} />
    </AppShell>
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProtectedRoute;