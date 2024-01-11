import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { routes } from "./route-data.route";
import AppShell from "layout/app/app-shell";

const AppRouteProvider: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            if (!route.private) {
              return (
                <Route
                  path={`${route.path}`}
                  element={route.component}
                  key={index}
                />
              );
            }
            return (
              <Route
                path={`${route.path}`}
                element={<AppShell>{route.component}</AppShell>}
                key={index}
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouteProvider;
