import { Col, Row } from "antd";
import TitleBar from "components/common/title-bar/title-bar.component";
import CourseList from "components/course/course-list.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useCourse } from "hooks/lms/course.hook";
import { useEnrollment } from "hooks/lms/enrollment.hook";
import React from "react";
import { Helmet } from "react-helmet-async";

const ClassRoomPage = () => {
    const { getCourse } = useCourse();
    const { enrollments } = useEnrollment();
    const courses = enrollments.map(en => getCourse(en.courseId));
  return (
    <>
      <Helmet>
        <title>
          Explore Premium Vet Products - Your Pet's Wellbeing, Our Priority
        </title>
        <meta
          name="description"
          content="Browse through a carefully curated collection of vet-approved products at Linkavet. Elevate your pet's lifestyle with our premium range of nutrition, grooming essentials, toys, and wellness products. Each item is selected with your pet's health and happiness in mind. Shop confidently for top-quality products that complement our commitment to excellence in veterinary care. Enhance your pet's life today with Linkavet."
        />
      </Helmet>
      <div style={{ margin: "3rem 0" }}>
        <Row gutter={[16, 16]} justify={"center"} align={"top"}>
          <Col xs={22} md={18}>
            <PageBreadCrumbs items={["courses", "classroom"]} />

            <TitleBar
              title={"Classroom"}
              subTitle={"View all your courses"}
              showButton={false}
              buttonLabel={"Edit Record"}
            />
            <BackButton title="Appointments" />
          </Col>
          <Col xs={22} md={18}>
            <CourseList courses={courses} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassRoomPage;
