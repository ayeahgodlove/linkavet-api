import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Steps, Typography } from "antd";
import useWindowSize from "hooks/shared/window-resize.hook";
import React from "react";
import { MdOutlinePayments } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import "./style.scss";
import { green } from "@ant-design/colors";

const { Title, Paragraph } = Typography;
const BuyInThreeSteps: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <>
      <Row
        align={"middle"}
        justify={"center"}
        style={{
          borderRadius: 0,
          paddingTop: "8rem",
          paddingBottom: "8rem",
        }}
      >
        <Col span={22}>
          <Title
            style={{
              textAlign: "center",
              lineHeight: 1.5,
              fontSize: 40,
              marginBottom: 0,
            }}
          >
            <span style={{ color: green.primary}}>Get Sarted</span> in 3 Easy Steps
          </Title>
          <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
            <p>
              Connecting medical professionals to farm owners, pet owners with
              these simple steps.
            </p>
          </Paragraph>
          {width > 768 ? (
            <>
              <div className="image image-card-1">
                <img src="images/bg-1.png" alt="doctors standing with pets" />
              </div>
              <div className="image image-card-2">
                <img src="images/bg-2.png" alt="doctors standing with pets" />
              </div>
            </>
          ) : (
            <></>
          )}
        </Col>
        <Col xs={20} md={20}>
          <Steps
            direction={width < 768 ? "vertical" : "horizontal"}
            style={{ marginTop: 50 }}
            items={[
              {
                title: (
                  <>
                    <Title level={5} color="#f39c12">
                      Register/Login
                    </Title>
                  </>
                ),
                status: "finish",
                icon: <UserOutlined style={{ color: "#f39c12" }} />,
                description: (
                  <>
                    <Paragraph>
                      <p>
                        Simply sigin using either Gmail, Facebook, Apple, and
                        Twitter.
                      </p>
                    </Paragraph>
                  </>
                ),
              },
              {
                title: (
                  <>
                    <Title level={5} color="#f39c12">
                      Get-in-touch with professionals
                    </Title>
                  </>
                ),
                status: "finish",
                icon: <FaUsersCog style={{ color: "#f77908" }} />,
                description: (
                  <>
                    <Paragraph>
                      <p>
                        Go through a list of renowned Veterinary doctors, and
                        book the one of your chosing...
                      </p>
                    </Paragraph>
                  </>
                ),
              },
              {
                title: (
                  <>
                    <Title level={5} color="#f39c12">
                      Get your solution
                    </Title>
                  </>
                ),
                status: "finish",
                icon: <SolutionOutlined style={{ color: "#f77908" }} />,
                description: (
                  <>
                    <Paragraph>
                      <p>Find the solution to your pets illnesses</p>
                    </Paragraph>
                  </>
                ),
              },
              {
                title: (
                  <>
                    <Title level={5} color="#f39c12">
                      Pay
                    </Title>
                  </>
                ),
                status: "finish",
                icon: <MdOutlinePayments style={{ color: "#f77908" }} />,
                description: (
                  <>
                    <Paragraph>
                      <p>Pay using MTN, Orange Money or Online Card payments</p>
                    </Paragraph>
                  </>
                ),
              },
              {
                title: (
                  <>
                    <Title level={5} color="#f39c12">
                      Done
                    </Title>
                  </>
                ),
                status: "finish",
                icon: <SmileOutlined style={{ color: "#f77908" }} />,
                description: (
                  <>
                    <Paragraph>
                      <p> Live a happy life from now on!</p>
                    </Paragraph>
                  </>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default BuyInThreeSteps;
