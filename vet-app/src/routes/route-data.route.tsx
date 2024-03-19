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
import LessonPlayerPage from "pages/course/lesson-player.page";
import LessonQuizePage from "pages/course/lesson-quize.page";
import BookAppointmentsPage from "pages/service/book.page";
import AppointmentListsPage from "pages/service/appointment_lists.page";
import AppointmentDetailPage from "pages/service/appointment_detail.page";
import ServicesPage from "pages/service/service.page";
import ClassRoomPage from "pages/course/classroom.page";

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
    path: "/courses/:name/learn",
    private: false,
    exact: true,
    component: <LessonPlayerPage />,
  },
  {
    path: "/courses/:name/quizes",
    private: false,
    exact: true,
    component: <LessonQuizePage />,
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
    path: "/classroom",
    private: false,
    exact: true,
    component: <ClassRoomPage />,
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
  {
    path: "/book-appointments",
    private: false,
    exact: true,
    component: <BookAppointmentsPage />,
  },
  {
    path: "/appointments",
    private: false,
    exact: true,
    component: <AppointmentListsPage />,
  },
  {
    path: "/appointments/:appointment",
    private: false,
    exact: true,
    component: <AppointmentDetailPage />,
  },
  {
    path: "/our_services",
    private: false,
    exact: true,
    component: <ServicesPage />,
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
