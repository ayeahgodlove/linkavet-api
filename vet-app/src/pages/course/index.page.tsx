import { Col, Divider, Row, Typography } from "antd";
import CourseList from "components/course/course-list.component";
import PageBannerComponent from "components/shared/page-banner/page-banner.component";
import { useAuth } from "hooks/auth/auth.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { fetchCoursesAsync } from "redux/lms/course.slice";

const CoursePage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoursesAsync() as any);
  }, [isLoading]);
  return (
    <GeneralAppShell>
        <Helmet>
        <title>
        Empower Yourself with Knowledge: Veterinary Courses Tailored for Pet Enthusiasts
        </title>
        <meta
          name="description"
          content="Embark on a learning journey with our specialized veterinary courses at Linkavet. Designed for pet enthusiasts and aspiring veterinary professionals, our courses cover a range of topics, from basic pet care to advanced veterinary techniques. Led by our experienced team of veterinarians, these courses provide valuable insights, hands-on learning, and a deeper understanding of pet health and wellness. Whether you're a pet parent or looking to build a career in veterinary care, Linkavet courses are crafted to empower you on your pet care journey."
        />
      </Helmet>
      {/* Dummy banner */}
      <PageBannerComponent
        title="Veterinary Courses Tailored for Pet Enthusiasts"
        description="Embark on a learning journey with our specialized veterinary courses at Linkavet. Designed for pet enthusiasts and aspiring veterinary professionals, our courses cover a range of topics, from basic pet care to advanced veterinary techniques."
        linkCmd="Browse Course"
      />
      {/* course list */}
      <Row style={{ marginTop: 50, padding: "0 3rem" }}>
        <Col span={24}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", opacity: 0.8 }}
          >
            Courses
          </Typography.Title>
          <Divider />
        </Col>
      </Row>
      <CourseList />
    </GeneralAppShell>
  );
};

export default CoursePage;
