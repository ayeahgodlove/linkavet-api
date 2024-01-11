import { Col, List } from "antd";
import React from "react";
import CourseCard from "./course-card.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useCourse } from "hooks/lms/course.hook";

interface Props {
  slice?: boolean;
}
const CourseList: React.FC<Props> = ({ slice = false }) => {
  const { courses, setCourse } = useCourse();
  const handleCourseClick = (courseId: string) => {
    const course = courses.find((course) => course.id === courseId);
    setCourse(course!);
  };
  return (
    <>
      {courses && courses.length > 0 ? (
        <List
          className="course-list"
          grid={{
            gutter: 0,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={slice ? courses.slice(0, 4) : courses}
          renderItem={(course) => {
            return (
              <CourseCard
                course={course}
                key={course.id}
                onCourseClick={handleCourseClick}
              />
            );
          }}
        />
      ) : (
        <Col span={24}>
          <NoContent title="No courses to display at the moment" />
        </Col>
      )}
    </>
  );
};

export default CourseList;
