import { Badge, Card, Col, List, Row, Typography } from "antd";
import { useRole } from "hooks/role.hook";
import React from "react";

const RoleDetailComponent: React.FC = () => {
  const { role } = useRole();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: role.id,
          },
          {
            label: "Name",
            value: role.name,
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

export default RoleDetailComponent;
