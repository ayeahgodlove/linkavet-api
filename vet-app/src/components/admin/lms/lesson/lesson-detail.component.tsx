import { Badge, Card, Col, List, Row, Typography } from "antd";
import { useLesson } from "hooks/lms/lesson.hook";
import React from "react";

const LessonDetailComponent: React.FC = () => {
  const { lesson } = useLesson();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: lesson.id,
          },
          {
            label: "Title",
            value: lesson.title,
          },
          {
            label: "Description",
            value: lesson.description,
          },
          {
            label: "Content",
            value: (
              <div
                dangerouslySetInnerHTML={{
                  __html: lesson.content,
                }}
              />
            ),
          },
          {
            label: "Duration",
            value: lesson.duration,
          },
          {
            label: "Difficulty",
            value: lesson.difficulty,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LessonDetailComponent;
