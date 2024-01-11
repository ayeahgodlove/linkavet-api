import { Card, Col, Image, List, Row, Typography } from "antd";
import { API_URL_UPLOADS_COURSES } from "config/constant";
import { useCourse } from "hooks/lms/course.hook";
import React from "react";

const CourseDetailComponent: React.FC = () => {
  const { course } = useCourse();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Title",
            value: <strong>{course.title}</strong>,
          },
          {
            label: "Description",
            value: course.description,
          },
          {
            label: "Course Banner",
            value: (
              <Image src={`${API_URL_UPLOADS_COURSES}/${course.courseImage}`} />
            ),
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

export default CourseDetailComponent;
