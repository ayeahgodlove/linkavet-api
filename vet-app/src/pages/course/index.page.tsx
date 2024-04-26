import { Col, Divider, Row, Typography } from "antd";
import CourseList from "components/course/course-list.component";
import { useAuth } from "hooks/auth/auth.hook";
import { useCourse } from "hooks/lms/course.hook";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { fetchCoursesAsync } from "redux/lms/course.slice";
import PageContent from "components/shared/page-content/index";

const CoursePage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { courses } = useCourse();

  useEffect(() => {
    dispatch(fetchCoursesAsync() as any);
  }, [isLoading]);
  return (
    <>
      <Helmet>
        <title>
          Empower Yourself with Knowledge: Veterinary Courses Tailored for Pet
          Enthusiasts
        </title>
        <meta
          name="description"
          content="Embark on a learning journey with our specialized veterinary courses at Linkavet. Designed for pet enthusiasts and aspiring veterinary professionals, our courses cover a range of topics, from basic pet care to advanced veterinary techniques. Led by our experienced team of veterinarians, these courses provide valuable insights, hands-on learning, and a deeper understanding of pet health and wellness. Whether you're a pet parent or looking to build a career in veterinary care, Linkavet courses are crafted to empower you on your pet care journey."
        />
      </Helmet>
      {/* Dummy banner */}

      <PageContent
        title={"Vet Courses Tailored for Enthusiasts"}
        breadcrumb={[
          {
            title: "Courses",
          },
        ]}
      />
      {/* course list */}
      <Row
        justify={"center"}
        style={{ marginTop: 50, marginBottom: 50, padding: "0 50px" }}
      >
        <Col xs={22} md={20}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", opacity: 0.8 }}
          >
            Courses
          </Typography.Title>
        </Col>
        <CourseList courses={courses} />
      </Row>
    </>
  );
};

export default CoursePage;
