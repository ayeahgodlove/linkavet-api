import React from "react";

import AdminBannerDetailPage from "../pages/admin/banner/banner-detail.page";
import AdminBannerPage from "../pages/admin/banner/banner.page";
import AdminCategoryDetailPage from "../pages/admin/category/category-detail.page";
import AdminCategoryPage from "../pages/admin/category/category.page";
import AdminDocumentDetailPage from "../pages/admin/document/document-detail.page";
import AdminDocumentPage from "../pages/admin/document/document.page";
import AdminPostDetailPage from "../pages/admin/post/post-detail.page";
import AdminPostPage from "../pages/admin/post/post.page";
import AdminProductDetailPage from "../pages/admin/product/product-detail.page";
import AdminProductPage from "../pages/admin/product/product.page";
import AdminReviewDetailPage from "../pages/admin/review/review-detail.page";
import AdminReviewPage from "../pages/admin/review/review.page";
import AdminStoreDetailPage from "../pages/admin/store/store-detail.page";
import AdminStorePage from "../pages/admin/store/store.page";
import AdminTagDetailPage from "../pages/admin/tag/tag-detail.page";
import AdminTagPage from "../pages/admin/tag/tag.page";
import AdminUserDetailPage from "../pages/admin/user/user-detail.page";
import AdminUserPage from "../pages/admin/user/user.page";
import ProductCreatePage from "../pages/admin/product/product-create.page";
import ProductEditPage from "../pages/admin/product/product-edit.page";
import AdminOrderPage from "../pages/admin/order/order.page";
import AdminOrderDetailPage from "../pages/admin/order/order-detail.page";
import AdminPaymentPage from "../pages/admin/payment/payment.page";
import AdminPaymentDetailPage from "../pages/admin/payment/payment-detail.page";
import AdminCoursePage from "../pages/admin/lms/course/course.page";
import AdminCourseDetailPage from "../pages/admin/lms/course/course-detail.page";
import AdminLessonPage from "../pages/admin/lms/lesson/lesson.page";
import AdminLessonDetailPage from "../pages/admin/lms/lesson/lesson-detail.page";
import AdminEnrollmentPage from "../pages/admin/lms/enrollment/enrollment.page";
import AdminEnrollmentDetailPage from "../pages/admin/lms/enrollment/enrollment-detail.page";
import AdminQuizPage from "../pages/admin/lms/quiz/quiz.page";
import AdminQuizDetailPage from "../pages/admin/lms/quiz/quiz-detail.page";
import AdminConsultationPage from "../pages/admin/health/consultation/consultation.page";
import AdminConsultationDetailPage from "../pages/admin/health/consultation/consultation-detail.page";
import AdminAppointmentPage from "../pages/admin/health/appointment/appointment.page";
import AdminAppointmentDetailPage from "../pages/admin/health/appointment/appointment-detail.page";
import AdminRolePage from "../pages/admin/role/role.page";
import AdminRoleDetailPage from "../pages/admin/role/role-detail.page";
import AdminUserRolePage from "../pages/admin/user-role/user-role.page";
import AdminUserRoleDetailPage from "../pages/admin/user-role/user-role-detail.page";
import AdminUserSpecialtyPage from "../pages/admin/user-specialty/user-specialty.page";
import ProfilePage from "../pages/auth/profile.page";

export const adminRoutes = [
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
    path: "/admin/user-specialties",
    private: true,
    exact: true,
    component: <AdminUserSpecialtyPage />,
  },
  {
    path: "/admin/roles",
    private: true,
    exact: true,
    component: <AdminRolePage />,
  },
  {
    path: "/admin/roles/:id",
    private: true,
    exact: true,
    component: <AdminRoleDetailPage />,
  },
  {
    path: "/admin/user-roles",
    private: true,
    exact: true,
    component: <AdminUserRolePage />,
  },
  {
    path: "/admin/user-roles/:id",
    private: true,
    exact: true,
    component: <AdminUserRoleDetailPage />,
  },
  {
    path: "/profile",
    private: true,
    exact: true,
    component: <ProfilePage />,
  },
];
