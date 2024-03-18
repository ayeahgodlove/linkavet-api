import React from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import useWindowSize from "hooks/shared/window-resize.hook";
import { green } from "@ant-design/colors";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RiBaseStationLine } from "react-icons/ri";

const servicesData = [
  {
    title: "General Check-ups",
    description:
      "Comprehensive health check-ups to ensure your pet is in the best condition.",
    image: "./images/general.jpg", // Replace with the actual URL or import the image
  },
  {
    title: "Vaccinations",
    description:
      "Stay up-to-date with vaccinations to protect your pet from common diseases.",
    image: "./images/vaccination.jpg", // Replace with the actual URL or import the image
  },
  {
    title: "Surgeries",
    description:
      "Professional surgical procedures performed by experienced veterinarians.",
    image: "./images/surgeries.jpg", // Replace with the actual URL or import the image
  },
];

const buttonStyle = {
  marginTop: "10px",
  paddingLeft: 25,
  paddingRight: 25,
  borderRadius: 50,
};
const OurServices = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ padding: `${width > 768 ? "0 5rem" : ".3rem"}` }}
    >
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={22} md={18} lg={18} xl={14} style={{ margin: "5rem 0" }}>
          <Typography.Title
            style={{
              textAlign: "center",
              fontSize: 40,
              marginBottom: 0,
            }}
          >
            <span className="gradient-title">
              On-demand Online vet appointments.
            </span>
          </Typography.Title>
          <Typography.Paragraph style={{ fontSize: 17, textAlign: "center" }}>
            <p>
              VetCare connects pet owners to thousands of licenced veterinary
              surgeons & nurses ready to provide the best online vet services
              through video chat appointments 24/7. <br />{" "}
              <Button type="link" style={{ color: "#5a008b", fontWeight: "bold"}} onClick={() => navigate("/services")}>
                More pet resources →
              </Button>
            </p>
          </Typography.Paragraph>
        </Col>
      </Col>
      {servicesData.map((service, index) => (
        <Col xs={24} md={8} key={index}>
          <Card
            key={index}
            title={service.title}
            style={{ margin: "20px" }}
            cover={
              <img
                alt={service.title}
                src={service.image}
                style={{ borderRadius: 0 }}
              />
            }
            hoverable
            bordered={false}
          >
            <p>{service.description}</p>
            <Button
              type="primary"
              style={{ ...buttonStyle, background: "#92ef94" }}
              icon={<FaUserDoctor />}
              onClick={() => navigate(`/services/book-appointments`)}
            >
              <span style={{ marginLeft: 5 }}>Book Now</span>
            </Button>
          </Card>
        </Col>
      ))}
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={4}>
          <Button
            type="primary"
            style={{ ...buttonStyle }}
            icon={<RiBaseStationLine />}
            onClick={() => navigate(`/services/book-appointments`)}
            block
          >
            <span style={{ marginLeft: 5 }}>Book an online vet now</span>
          </Button>
        </Col>
      </Col>
    </Row>
  );
};

export default OurServices;
