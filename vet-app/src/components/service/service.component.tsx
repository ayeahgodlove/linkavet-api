import React from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import useWindowSize from "hooks/shared/window-resize.hook";
import { green } from "@ant-design/colors";
import { FaUserDoctor } from "react-icons/fa6";

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
  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ padding: `${width > 768 ? "0 5rem" : ".3rem"}` }}
    >
      <Col span={22} style={{ margin: "2rem 0" }}>
        <Typography.Title
          style={{
            textAlign: "center",
            lineHeight: 1.5,
            fontSize: 40,
            marginBottom: 0,
          }}
        >
          <span style={{ color: green.primary }}>Our</span> Services
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 17, textAlign: "center" }}>
          <p>These are some of our services we have</p>
        </Typography.Paragraph>
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
              style={buttonStyle}
              icon={<FaUserDoctor />}
              onClick={() => alert(`Book Now for ${service.title}`)}
            >
              <span style={{ marginLeft: 5 }}>Book Now</span>
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OurServices;
