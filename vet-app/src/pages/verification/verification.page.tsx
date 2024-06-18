import { Col, Divider, Row, Typography } from "antd";
import UploadDocument from "components/verification/upload-doc.component";
import VerificationComponent from "components/verification/verification.component";

import React from "react";

const VerificationPage = () => {
  return (
    <Row gutter={[32, 32]} justify={"center"}>
      <VerificationComponent>
        <Col md={15} span={24}>
          <Typography.Title level={4}>Upload ID CARD</Typography.Title>
        </Col>
        <Divider /> 

        <UploadDocument />
      </VerificationComponent>
    </Row>
  );
};

export default VerificationPage;
