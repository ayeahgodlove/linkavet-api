import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import "./why-honeyman.style.scss";

const { Title, Paragraph } = Typography;
export const WhyLinkaVet = () => {
  return (
    <>
      <Card
        // hoverable
        size="small"
        bordered={false}
        bodyStyle={{ padding: 0, overflow: "hidden", margin: "6rem 0" }}
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
                className="gradient-title gradient-title-font"
                style={{
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Why LinkaVet?
              </Title>
              <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
                Get access to Veterinary doctors has never been easier in the
                entire history of mankind
              </Paragraph>
              <Button shape="round" type="primary" href="/about-us">
                Learn more
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
