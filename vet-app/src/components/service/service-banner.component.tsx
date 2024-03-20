import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;
export const ServiceBanner = () => {
  return (
    <>
      <Card
        hoverable
        bordered={false}
        bodyStyle={{ padding: 0, overflow: "hidden", margin: "0 0 6rem 0" }}
      >
        <Row align={"middle"} justify="space-between">
          <Col xs={24} md={12}>
            <img
              alt="avatar"
              src="./images/kylee-alons-suQ-D-9dmVU-unsplash.jpg"
              style={{ height: "auto", maxWidth: "100%" }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: 32,
              }}
            >
              <Title
                style={{
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
                className="gradient-title gradient-title-font"
              >
                Expert Veterinary Care for Your Beloved Pets
              </Title>
              <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
                From routine check-ups to specialized treatments, our team of
                experienced veterinarians and staff are here to ensure the
                health and well-being of your furry companions.
              </Paragraph>
              <Button
                shape="round"
                type="primary"
                href="/appointments"
              >
                Schedule an appointment
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
