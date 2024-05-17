import { Col, Divider, Row, Typography } from "antd";
import VerificationComponent from "components/verification/verification.component";
import React from "react";

const VerificationDiplomaPage = () => {
  return (
    <Row gutter={[32, 32]} justify={"center"}>
      <VerificationComponent>
        <Col md={15} span={24}>
          <Typography.Title level={4}>Upload Diploma</Typography.Title>
        </Col>
        <Divider />

        <Row align="middle" justify="space-between">
          <Col md={15}>{/* <h3>Information</h3> */}</Col>
        </Row>
      </VerificationComponent>
    </Row>
  );
};

export default VerificationDiplomaPage;
