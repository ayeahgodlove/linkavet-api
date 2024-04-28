import { useAuth } from "../../hooks/auth/auth.hook";
import { useCourse } from "../../hooks/lms/course.hook";
import React from "react";
import { Navigate } from "react-router-dom";
import slugify from "slugify";

const AuthCheckPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { course } = useCourse();

  if (isAuthenticated && user) {
    return (
      <Navigate
        to={`/courses/${slugify(course.title, {
          lower: true,
        })}/enrollment-payment`}
      />
    );
  }
  return <Navigate to={"/auth/login"} />;
};

export default AuthCheckPage;
