import { Badge, Card, Col, List, Row, Typography } from "antd";
import { useUser } from "hooks/user.hook";
import React from "react";

const UserDetailComponent: React.FC = () => {
  const { user } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: user.id,
          },
          {
            label: "Name",
            value: user.username,
          },
          {
            label: "FirstName",
            value: user.firstname,
          },
          {
            label: "LastName",
            value: user.lastname,
          },
          {
            label: "Address",
            value: user.address,
          },
          {
            label: "Telephone",
            value: user.phoneNumber,
          },
          {
            label: "FirstName",
            value: user.verified ? (
              <Badge color="green" text="YES" />
            ) : (
              <Badge color="red" text="NO" />
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

export default UserDetailComponent;
