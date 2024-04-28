import { Card, Col, Empty, List, Row, Typography } from "antd";
import BackButton from "../../components/shared/back-button.component";
import PageBreadCrumbs from "../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useLesson } from "../../hooks/lms/lesson.hook";
import { useQuiz } from "../../hooks/lms/quiz.hook";
import React from "react";

const LessonQuizePage = () => {
  const { lesson } = useLesson();
  const { getLessonQuizes } = useQuiz();

  console.log("test: ", getLessonQuizes(lesson.id));
  return (
    <>
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
            {getLessonQuizes(lesson.id).length > 0 ? (
              getLessonQuizes(lesson.id).map((acc) => {
                return (
                  <Card>
                    <Typography.Title level={3} style={{ marginTop: "16px" }}>
                      {acc.question}
                    </Typography.Title>
                    <Typography.Paragraph>
                      Select the correct answer from the options below:
                    </Typography.Paragraph>
                    <List
                      size="large"
                      bordered
                      dataSource={acc.answers}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Card>
                );
              })
            ) : (
              <Card title={<Empty description={"no quizes at the moment"} />} />
            )}
          </Col>
        </Row>
      </>
    </>
  );
};

export default LessonQuizePage;
