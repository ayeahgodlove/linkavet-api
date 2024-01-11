import { Card, Col, List, Row, Typography } from "antd";
import { useTag } from "hooks/tag.hook";
import React from "react";

const TagDetailComponent: React.FC = () => {
  const { tag } = useTag();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: tag.id,
          },
          {
            label: "Name",
            value: tag.name,
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

export default TagDetailComponent;
