import { Card, Col, Row } from "antd";
import UploadMenu from "components/verification/upload-menu.component";
import React from "react";

interface IProp {
  children: React.ReactNode;
}
const VerificationComponent: React.FC<IProp> = ({ children }) => {
  return (
    <Col xs={24} md={20} className="user-profile_container">
      <Card bordered={false} hoverable style={{ marginTop: 50}}>
        <Row>
          <UploadMenu className={"user-profile_menu"} />
          <Col xs={24} lg={16}>
            {children}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default VerificationComponent;
