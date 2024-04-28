import React from "react";
import ActivationPage from "../pages/activation.page";
import ForgotPasswordPage from "../pages/auth/forgot-password.page";
import LoginPage from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import AuthCheckPage from "../pages/auth/auth-check.page";


export const authRoutes = [
  /**
   * Auth
   */
  {
    path: "/activation/:activationToken",
    private: false,
    exact: true,
    component: <ActivationPage />,
  },
  {
    path: "/auth/login",
    private: false,
    exact: true,
    component: <LoginPage />,
  },
  {
    path: "/auth/register",
    private: false,
    exact: true,
    component: <RegisterPage />,
  },
  {
    path: "/auth/forgot-password",
    private: false,
    exact: true,
    component: <ForgotPasswordPage />,
  },
  {
    path: "/auth-check",
    private: false,
    exact: true,
    component: <AuthCheckPage />,
  },
];
