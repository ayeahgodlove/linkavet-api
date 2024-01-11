import { IRoute } from "models/route.model";
import NotFoundPage from "pages/404_Page";
import ActivationPage from "pages/activation.page";
import AdminBannerDetailPage from "pages/admin/banner/banner-detail.page";
import AdminBannerPage from "pages/admin/banner/banner.page";
import AdminCategoryDetailPage from "pages/admin/category/category-detail.page";
import AdminCategoryPage from "pages/admin/category/category.page";
import AdminDocumentDetailPage from "pages/admin/document/document-detail.page";
import AdminDocumentPage from "pages/admin/document/document.page";
import AdminPostDetailPage from "pages/admin/post/post-detail.page";
import AdminPostPage from "pages/admin/post/post.page";
import AdminProductDetailPage from "pages/admin/product/product-detail.page";
import AdminProductPage from "pages/admin/product/product.page";
import AdminReviewDetailPage from "pages/admin/review/review-detail.page";
import AdminReviewPage from "pages/admin/review/review.page";
import AdminStoreDetailPage from "pages/admin/store/store-detail.page";
import AdminStorePage from "pages/admin/store/store.page";
import AdminTagDetailPage from "pages/admin/tag/tag-detail.page";
import AdminTagPage from "pages/admin/tag/tag.page";
import AdminUserDetailPage from "pages/admin/user/user-detail.page";
import AdminUserPage from "pages/admin/user/user.page";
import ForgotPasswordPage from "pages/auth/forgot-password.page";
import LoginPage from "pages/auth/login.page";
import RegisterPage from "pages/auth/register.page";
import CallbackPage from "pages/callback.page";
import DashboardPage from "pages/dashboard/dashboard.page";
import PostPage from "pages/post/index.page";
import PostDetailPage from "pages/post/post-detail.page";
import ProductPage from "pages/product/index.page";
import ProductDetailPage from "pages/product/product-detail.page";
import WelcomePage from "pages/welcome.page";
import React from "react";
import ProductCreatePage from "pages/admin/product/product-create.page";
import ProductEditPage from "pages/admin/product/product-edit.page";
import AdminOrderPage from "pages/admin/order/order.page";
import AdminOrderDetailPage from "pages/admin/order/order-detail.page";
import AdminPaymentPage from "pages/admin/payment/payment.page";
import AdminPaymentDetailPage from "pages/admin/payment/payment-detail.page";
import ShoppingCartPage from "pages/shopping-cart/shopping-cart.page";
import { PageCheckoutPage } from "pages/payment/payment-checkout.page";
import PaymentFeedbackPage from "pages/payment/payment-feedback.page";
import AdminCoursePage from "pages/admin/lms/course/course.page";
import AdminCourseDetailPage from "pages/admin/lms/course/course-detail.page";
import AdminLessonPage from "pages/admin/lms/lesson/lesson.page";
import AdminLessonDetailPage from "pages/admin/lms/lesson/lesson-detail.page";
import AdminEnrollmentPage from "pages/admin/lms/enrollment/enrollment.page";
import AdminEnrollmentDetailPage from "pages/admin/lms/enrollment/enrollment-detail.page";
import AdminQuizPage from "pages/admin/lms/quiz/quiz.page";
import AdminQuizDetailPage from "pages/admin/lms/quiz/quiz-detail.page";
import CoursePage from "pages/course/index.page";
import CourseDetailPage from "pages/course/course-detail.page";
import AdminConsultationPage from "pages/admin/health/consultation/consultation.page";
import AdminConsultationDetailPage from "pages/admin/health/consultation/consultation-detail.page";
import AdminAppointmentPage from "pages/admin/health/appointment/appointment.page";
import AdminAppointmentDetailPage from "pages/admin/health/appointment/appointment-detail.page";
import CourseEnrollmentPaymentPage from "pages/course/course-enrollment-payment.page";
import CourseEnrollmentPage from "pages/course/course-enrollment.page";
import AuthCheckPage from "pages/auth/auth-check.page";

export const routes: IRoute[] = [
  {
    path: "/activation/:activationToken",
    private: false,
    exact: true,
    component: <ActivationPage />,
  },
  /**
   * callback route
   */
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
  /**
   * dashboard route
   */
  {
    path: "/dashboard",
    private: true,
    exact: true,
    component: <DashboardPage />,
  },

  /**
   * Auth
   */
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

  // admin section
  // private routes
  {
    path: "/admin/categories",
    private: true,
    exact: true,
    component: <AdminCategoryPage />,
  },
  {
    path: "/admin/categories/:name",
    private: true,
    exact: true,
    component: <AdminCategoryDetailPage />,
  },
  {
    path: "/admin/tags",
    private: true,
    exact: true,
    component: <AdminTagPage />,
  },
  {
    path: "/admin/tags/:name",
    private: true,
    exact: true,
    component: <AdminTagDetailPage />,
  },

  {
    path: "/admin/posts",
    private: true,
    exact: true,
    component: <AdminPostPage />,
  },
  {
    path: "/admin/posts/:name",
    private: true,
    exact: true,
    component: <AdminPostDetailPage />,
  },

  {
    path: "/admin/stores",
    private: true,
    exact: true,
    component: <AdminStorePage />,
  },
  {
    path: "/admin/stores/:name",
    private: true,
    exact: true,
    component: <AdminStoreDetailPage />,
  },

  {
    path: "/admin/products",
    private: true,
    exact: true,
    component: <AdminProductPage />,
  },
  {
    path: "/admin/products/create",
    private: true,
    exact: true,
    component: <ProductCreatePage />,
  },
  {
    path: "/admin/products/:name/edit",
    private: true,
    exact: true,
    component: <ProductEditPage />,
  },
  {
    path: "/admin/products/:name",
    private: true,
    exact: true,
    component: <AdminProductDetailPage />,
  },

  {
    path: "/admin/documents",
    private: true,
    exact: true,
    component: <AdminDocumentPage />,
  },
  {
    path: "/admin/documents/:name",
    private: true,
    exact: true,
    component: <AdminDocumentDetailPage />,
  },
  {
    path: "/admin/banners",
    private: true,
    exact: true,
    component: <AdminBannerPage />,
  },
  {
    path: "/admin/banners/:title",
    private: true,
    exact: true,
    component: <AdminBannerDetailPage />,
  },

  // admin section
  // private routes
  // course module
  {
    path: "/admin/courses",
    private: true,
    exact: true,
    component: <AdminCoursePage />,
  },
  {
    path: "/admin/courses/:id",
    private: true,
    exact: true,
    component: <AdminCourseDetailPage />,
  },
  {
    path: "/admin/lessons",
    private: true,
    exact: true,
    component: <AdminLessonPage />,
  },
  {
    path: "/admin/lessons/:id",
    private: true,
    exact: true,
    component: <AdminLessonDetailPage />,
  },
  {
    path: "/admin/enrollments",
    private: true,
    exact: true,
    component: <AdminEnrollmentPage />,
  },
  {
    path: "/admin/enrollments/:id",
    private: true,
    exact: true,
    component: <AdminEnrollmentDetailPage />,
  },
  {
    path: "/admin/quizes",
    private: true,
    exact: true,
    component: <AdminQuizPage />,
  },
  {
    path: "/admin/quizes/:id",
    private: true,
    exact: true,
    component: <AdminQuizDetailPage />,
  },
  // end course module

  // health
  {
    path: "/admin/consultations",
    private: true,
    exact: true,
    component: <AdminConsultationPage />,
  },
  {
    path: "/admin/consultations/:id",
    private: true,
    exact: true,
    component: <AdminConsultationDetailPage />,
  },
  {
    path: "/admin/appointments",
    private: true,
    exact: true,
    component: <AdminAppointmentPage />,
  },
  {
    path: "/admin/appointments/:id",
    private: true,
    exact: true,
    component: <AdminAppointmentDetailPage />,
  },

  // business module
  {
    path: "/admin/reviews",
    private: true,
    exact: true,
    component: <AdminReviewPage />,
  },
  {
    path: "/admin/reviews/:id",
    private: true,
    exact: true,
    component: <AdminReviewDetailPage />,
  },
  {
    path: "/admin/orders",
    private: true,
    exact: true,
    component: <AdminOrderPage />,
  },
  {
    path: "/admin/orders/:id",
    private: true,
    exact: true,
    component: <AdminOrderDetailPage />,
  },
  {
    path: "/admin/payments",
    private: true,
    exact: true,
    component: <AdminPaymentPage />,
  },
  {
    path: "/admin/payments/:id",
    private: true,
    exact: true,
    component: <AdminPaymentDetailPage />,
  },
  // end of business module
  {
    path: "/admin/users",
    private: true,
    exact: true,
    component: <AdminUserPage />,
  },
  {
    path: "/admin/users/:id",
    private: true,
    exact: true,
    component: <AdminUserDetailPage />,
  },
  {
    // default not found route
    path: "*",
    private: false,
    exact: false,
    component: <NotFoundPage />,
  },
];
