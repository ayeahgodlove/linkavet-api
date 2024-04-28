import { Button, Card, Col, Row, Typography } from "antd";
import BackButton from "../../components/shared/back-button.component";
import PageBreadCrumbs from "../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useCourse } from "../../hooks/lms/course.hook";
import { useLesson } from "../../hooks/lms/lesson.hook";
import React from "react";
import ReactPlayer from "react-player/youtube";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const LessonPlayerPage = () => {
  const { lesson } = useLesson();
  const { course } = useCourse();

  const navigate = useNavigate();

  const takeQuizes = () => {
    navigate(
      `/courses/${slugify(lesson.title, {
        lower: true,
        replacement: "-",
      })}/quizes`
    );
  };
  return (
    <>
      <Row
        justify={"center"}
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
        gutter={[16, 16]}
        className="course-container"
      >
        <Col xs={18} md={15}>
          <PageBreadCrumbs items={["Pages", "Course", "Details"]} />
          <BackButton title="Course" />
        </Col>
        <Col xs={18} md={15}>
          <Card title={`${course.title}`}>
            <ReactPlayer
              //   url="https://www.example.com/your-course-video.mp4"
              url={lesson.url}
              controls
              width="100%"
              height="400px"
            />
            <Typography.Title level={3} style={{ marginTop: "16px" }}>
              {lesson.title}
            </Typography.Title>
            <Typography.Paragraph>
              <div
                dangerouslySetInnerHTML={{
                  __html: lesson.description,
                }}
              />
            </Typography.Paragraph>
            {/* Add quiz section here */}
            <Typography.Title level={4}>Quizzes</Typography.Title>
            {/* Add quiz components or list of quizzes here */}
            <Button type="primary" onClick={takeQuizes}>
              Take Quizes
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LessonPlayerPage;
