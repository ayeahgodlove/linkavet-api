import { Card, Col, List, Row, Typography } from "antd";
import { useCourse } from "hooks/lms/course.hook";
import { useEnrollment } from "hooks/lms/enrollment.hook";
import { useUser } from "hooks/user.hook";
import React from "react";

const EnrollmentDetailComponent: React.FC = () => {
  const { enrollment } = useEnrollment();
  const { getCourse } = useCourse();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: enrollment.id,
          },
          {
            label: "Course",
            value: getCourse(enrollment.courseId).description,
          },
          {
            label: "User",
            value: getUser(enrollment.courseId).username,
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

export default EnrollmentDetailComponent;
