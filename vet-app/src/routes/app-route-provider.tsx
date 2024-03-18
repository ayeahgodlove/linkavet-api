import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { routes } from "./route-data.route";
import AppShell from "layout/app/app-shell";
import GeneralAppShell from "layout/app/general-app-shell";

const AppRouteProvider: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path} // Use a unique identifier as the key
              path={route.path}
              element={
                route.private ? (
                  <AppShell>{route.component}</AppShell>
                ) : (
                  <GeneralAppShell>{route.component}</GeneralAppShell>
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouteProvider;
