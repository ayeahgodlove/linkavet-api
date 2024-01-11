import { Card, Col, Image, List, Row, Typography } from "antd";
import { useConsultation } from "hooks/health/consultation.hook";
import { useUser } from "hooks/user.hook";
import React from "react";

const ConsultationDetailComponent: React.FC = () => {
  const { consultation } = useConsultation();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Diagnosis",
            value: consultation.diagnosis,
          },
          {
            label: "Vet Owner",
            value: getUser(consultation.petOwnerId).username,
          },
          {
            label: "Vet Doctor",
            value: getUser(consultation.vetDoctorId).username,
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

export default ConsultationDetailComponent;
