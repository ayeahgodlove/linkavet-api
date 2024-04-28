import { Card, Col, List, Row, Typography } from "antd";
import { useUserSpecialty } from "../../../hooks/user-specialty.hook";
import React from "react";

const UserSpecialtyDetailComponent: React.FC = () => {
  const { userSpecialty } = useUserSpecialty();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: userSpecialty.id,
          },
          {
            label: "Specialty",
            value: userSpecialty.specialty,
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

export default UserSpecialtyDetailComponent;
