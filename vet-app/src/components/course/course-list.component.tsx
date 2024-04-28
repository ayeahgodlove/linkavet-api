import { Col, List, Row } from "antd";
import React from "react";
import CourseCard from "./course-card.component";
import { NoContent } from "../../components/shared/no-content/no-content.component";
import { useCourse } from "../../hooks/lms/course.hook";
import { ICourse } from "../../models/lms/course";

interface IProp {
  courses: ICourse[]
}
const CourseList: React.FC<IProp> = ({ courses }) => {
  const { setCourse } = useCourse();
  const handleCourseClick = (courseId: string) => {
    const course = courses.find((course) => course.id === courseId);
    setCourse(course!);
  };
  return (
    <>
      {courses && courses.length > 0 ? (
        courses.slice(0, 4).map((course) => (
          <Col xs={22} md={6} key={course.id}>
            <CourseCard
              course={course}
              key={course.id}
              onCourseClick={handleCourseClick}
            />
          </Col>
        ))
      ) : (
        <Col span={24}>
          <NoContent title="No courses to display at the moment" />
        </Col>
      )}
    </>
  );
};

export default CourseList;
