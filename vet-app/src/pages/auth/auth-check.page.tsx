import { useAuth } from "hooks/auth/auth.hook";
import { useCourse } from "hooks/lms/course.hook";
import { useMessageContext } from "context/session.context";
import React, { useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import slugify from "slugify";

const AuthCheckPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { course } = useCourse();
  const { handleMessageChange } = useMessageContext();

  useEffect(() => {
    handleMessageChange({
      title: "Sign in!",
      message: "You need to sign in before you can enroll for this course",
      icon: <BiInfoCircle size={25} />,
      redirectTo: `/courses/${slugify(course.title, { lower: true })}/enrollment-payment`,
      isRedirect: true,
    });
  }, [handleMessageChange, course.title]);
  
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
