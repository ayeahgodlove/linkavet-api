import { Card, Col, List, Row, Typography } from "antd";
import { useSpecialty } from "../../../hooks/specialty.hook";
import React from "react";

const SpecialtyDetailComponent: React.FC = () => {
  const { specialty } = useSpecialty();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: specialty.id,
          },
          {
            label: "Specialty",
            value: specialty.specialty,
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

export default SpecialtyDetailComponent;
