import { Card, Col, List, Row, Typography } from "antd";
import { useUserRole } from "hooks/user-role.hook";
import React from "react";

const UserRoleDetailComponent: React.FC = () => {
  const { userRole } = useUserRole();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "User",
            value: userRole.userId,
          },
          {
            label: "Role",
            value: userRole.roleId,
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

export default UserRoleDetailComponent;
