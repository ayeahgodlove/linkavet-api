import { IRoute } from "models/route.model";
import NotFoundPage from "pages/404_Page";

import CallbackPage from "pages/callback.page";
import DashboardPage from "pages/dashboard/dashboard.page";
import PostPage from "pages/post/index.page";
import PostDetailPage from "pages/post/post-detail.page";
import ProductPage from "pages/product/index.page";
import ProductDetailPage from "pages/product/product-detail.page";
import WelcomePage from "pages/welcome.page";
import React from "react";

import ShoppingCartPage from "pages/shopping-cart/shopping-cart.page";
import { PageCheckoutPage } from "pages/payment/payment-checkout.page";
import PaymentFeedbackPage from "pages/payment/payment-feedback.page";

import CoursePage from "pages/course/index.page";
import CourseDetailPage from "pages/course/course-detail.page";

import CourseEnrollmentPaymentPage from "pages/course/course-enrollment-payment.page";
import CourseEnrollmentPage from "pages/course/course-enrollment.page";
import { adminRoutes } from "./admin.route";
import { authRoutes } from "./auth.route";
import FaqsPage from "pages/faqs/index.page";
import ContactUsPage from "pages/contact-us/index.page";
import AboutUsPages from "pages/about-us/index.page";
import UnAuthorizedPage from "pages/unauthorized.page";
import { Navigate } from "react-router-dom";

export const routes: IRoute[] = [
  /**
   * callback route
   */
  ...authRoutes,
  {
    path: "/callback",
    private: false,
    exact: true,
    component: <CallbackPage />,
  },
  /**
   * Welcome
   */
  {
    path: "/",
    private: false,
    exact: true,
    component: <WelcomePage />,
  },
  {
    path: "/products",
    private: false,
    exact: true,
    component: <ProductPage />,
  },
  {
    path: "/products/:name",
    private: false,
    exact: true,
    component: <ProductDetailPage />,
  },
  {
    path: "/shopping-cart",
    private: false,
    exact: true,
    component: <ShoppingCartPage />,
  },
  {
    path: "/payment/checkout",
    private: false,
    exact: true,
    component: <PageCheckoutPage />,
  },
  {
    path: "/payment-feedback",
    private: false,
    exact: true,
    component: <PaymentFeedbackPage />,
  },
  {
    path: "/orders",
    private: false,
    exact: true,
    component: <ShoppingCartPage />,
  },
  {
    path: "/posts",
    private: false,
    exact: true,
    component: <PostPage />,
  },
  {
    path: "/posts/:name",
    private: false,
    exact: true,
    component: <PostDetailPage />,
  },
  {
    path: "/courses",
    private: false,
    exact: true,
    component: <CoursePage />,
  },
  {
    path: "/courses/:title",
    private: false,
    exact: true,
    component: <CourseDetailPage />,
  },
  {
    path: "/courses/:title/enrollment-payment",
    private: false,
    exact: true,
    component: <CourseEnrollmentPaymentPage />,
  },
  {
    path: "/courses/:title/enrollment",
    private: false,
    exact: true,
    component: <CourseEnrollmentPage />,
  },
  {
    path: "/faqs",
    private: false,
    exact: true,
    component: <FaqsPage />,
  },
  {
    path: "/contact-us",
    private: false,
    exact: true,
    component: <ContactUsPage />,
  },
  {
    path: "/about-us",
    private: false,
    exact: true,
    component: <AboutUsPages />,
  },
  /**
   * dashboard route
   */
  {
    path: "/dashboard",
    private: true,
    exact: true,
    component: <DashboardPage />,
  },
  ...adminRoutes,
  {
    path: "/unauthorized",
    private: false,
    exact: true,
    component: <UnAuthorizedPage />,
  },
  {
    // default not found route
    path: "*",
    private: false,
    exact: false,
    component: <NotFoundPage />,
  },
];
