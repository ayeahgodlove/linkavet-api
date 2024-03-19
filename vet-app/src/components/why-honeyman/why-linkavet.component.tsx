import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import "./why-honeyman.style.scss";

const { Title, Paragraph } = Typography;
export const WhyLinkaVet = () => {
  return (
    <>
      {/* <Row
        align={"middle"}
        justify={"center"}
        style={{ paddingTop: "8rem", paddingBottom: "8rem" }}
      >
        <Col xs={24} md={24} lg={24}>
          <Title
            style={{
              textAlign: "center",
              lineHeight: 1.5,
              fontSize: 40,
              marginBottom: 0,
            }}
          >
            Why LinkaVet?
          </Title>
          <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
            <p>
              Get access to Veterinary doctors has never been easier in the
              entire history of mankind
            </p>
          </Paragraph>
        </Col>
        <Col span={24}>
          <div className="hexagon-container">
            <div className="hex">
              <div style={{ textAlign: "center", padding: 5 }}>
                <BiBadgeCheck
                  size={50}
                  style={{ color: isDarkMode ? "#572f08" : "#261f13" }}
                />
                <Title level={5}>Top notch Professionals</Title>
                <Paragraph>
                  <p
                    style={{ fontSize: width < 768 ? 11 : 13, lineHeight: 1.3 }}
                  >
                    Get access to top-notch professionals affordably.
                  </p>
                </Paragraph>
              </div>
            </div>
            <div className="hex">
              <div style={{ textAlign: "center", padding: 5 }}>
                <MdOutlineConnectWithoutContact
                  size={50}
                  style={{ color: isDarkMode ? "#261f13" : "#572f08" }}
                />
                <Title level={5}>Meet & Connect</Title>
                <Paragraph>
                  <p
                    style={{ fontSize: width < 768 ? 11 : 13, lineHeight: 1.3 }}
                  >
                    Connect with over 20k people on our platform and make sales.
                  </p>
                </Paragraph>
              </div>
            </div>
            <div className="hex">
              <div style={{ textAlign: "center", padding: 5 }}>
                <GrConnect
                  size={50}
                  color={isDarkMode ? "#572f08" : "#261f13"}
                />
                <Title level={5}>Payments</Title>
                <Paragraph>
                  <p
                    style={{ fontSize: width < 768 ? 11 : 13, lineHeight: 1.3 }}
                  >
                    Payments are convenient, fast, secured and easy-to-use.
                    through MTN, Orange money & Online Bank Transactions
                  </p>
                </Paragraph>
              </div>
            </div>
            <div className="hex">
              <div style={{ textAlign: "center", padding: 5 }}>
                <BiSupport
                  size={50}
                  style={{ color: isDarkMode ? "#261f13" : "#572f08" }}
                />
                <Title level={5}>24/7 Support</Title>
                <Paragraph>
                  <p
                    style={{ fontSize: width < 768 ? 11 : 13, lineHeight: 1.3 }}
                  >
                    Do you have a complaint? Simply fill this form to get
                    answers ASAP. Or reach out to us using our whatsapp numbers
                  </p>
                </Paragraph>
              </div>
            </div>
          </div>
        </Col>
      </Row> */}

      <Card
        hoverable
        bordered={false}
        bodyStyle={{ padding: 0, overflow: "hidden", margin: "6rem 0" }}
      >
        <Row align={"middle"} justify="space-between">
          <Col xs={24} md={12}>
            <img
              alt="avatar"
              src="./images/kylee-alons-suQ-D-9dmVU-unsplash.jpg"
              style={{ height: "auto", width: "500px", maxWidth: "100%" }}
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
                  fontSize: 40,
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
