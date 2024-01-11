import { Card, Col, List, Row, Typography } from "antd";
import { useReview } from "hooks/review.hook";
import React from "react";

const ReviewDetailComponent: React.FC = () => {
  const { review } = useReview();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: review.id,
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

export default ReviewDetailComponent;
