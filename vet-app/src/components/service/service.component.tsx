import React from "react";
import { Card, Button, Row, Col, Typography, ConfigProvider } from "antd";
import useWindowSize from "../../hooks/shared/window-resize.hook";
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
    title: "Surgical Procedures",
    description:
      "Professional surgical procedures performed by experienced veterinarians.",
    image: "./images/surgeries.jpg", // Replace with the actual URL or import the image
  },
  {
    title: "Preventive Care",
    description:
      "Annual exams, vaccinations, parasite control, and dental care to keep your pet healthy and happy",
    image: "./images/appointment.jpg", //
  },
  {
    title: "Preventive Care",
    description:
      "Annual exams, vaccinations, parasite control, and dental care to keep your pet healthy and happy",
    image: "./images/_c63bdd8d-e2c9-4ef2-819b-7fc6dd19ca52.jpg", //
  },
  {
    title: "Specialty Services",
    description:
      " Specialized care for specific conditions, such as dermatology, ophthalmology, and internal medicine, provided by our skilled team of specialists",
    image: "./images/bg-2.png", //
  },
];

const buttonStyle = {
  marginTop: "10px",
  paddingLeft: 25,
  paddingRight: 25,
  borderRadius: 50,
};

interface IProp {
  limit: boolean;
}
const OurServices: React.FC<IProp> = ({ limit = false }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
        },
      }}
    >
      <Row
        justify={"center"}
        align={"middle"}
        style={{ padding: `${width > 768 ? "0 5rem" : ".3rem"}` }}
      >
        {limit && (
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col xs={22} md={18} lg={18} xl={14} style={{ margin: `${width > 768 ? "5rem 0" : "2rem 0px 4rem 0px"}` }}>
              <Typography.Title
                style={{
                  textAlign: "center",
                  fontSize: 40,
                  marginBottom: 0,
                }}
              >
                <span className="gradient-title gradient-title-font">
                  On-demand Online vet appointments.
                </span>
              </Typography.Title>
              <Typography.Paragraph
                style={{ fontSize: 17, textAlign: "center" }}
              >
                <p>
                  VetCare connects pet owners to thousands of licenced
                  veterinary surgeons & nurses ready to provide the best online
                  vet services through video chat appointments 24/7. <br />{" "}
                  <Button
                    type="link"
                    style={{ color: "#5a008b", fontWeight: "bold" }}
                    onClick={() => navigate("/our_services")}
                  >
                    More pet resources →
                  </Button>
                </p>
              </Typography.Paragraph>
            </Col>
          </Col>
        )}

        {limit
          ? servicesData.slice(0, 3).map((service, index) => (
              <Col xs={24} md={7} key={index}>
                <Card
                  key={index}
                  title={service.title}
                  style={{ margin: "20px" }}
                  cover={
                    <img
                      alt={service.title}
                      src={service.image}
                      style={{
                        borderRadius: 0,
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  }
                  hoverable
                  bordered={false}
                >
                  <p>{service.description}</p>
                  <Button
                    type="primary"
                    style={{ ...buttonStyle }}
                    icon={<FaUserDoctor />}
                    onClick={() => navigate(`/appointments`)}
                  >
                    <span style={{ marginLeft: 5 }}>Book Now</span>
                  </Button>
                </Card>
              </Col>
            ))
          : servicesData.map((service, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  key={index}
                  title={service.title}
                  style={{ margin: "20px" }}
                  cover={
                    <img
                      alt={service.title}
                      src={service.image}
                      style={{
                        borderRadius: 0,
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  }
                  hoverable
                  bordered={false}
                >
                  <p>{service.description}</p>
                  <Button
                    type="primary"
                    style={{ ...buttonStyle }}
                    icon={<FaUserDoctor />}
                    onClick={() => navigate(`/appointments`)}
                  >
                    <span style={{ marginLeft: 5 }}>Book Now</span>
                  </Button>
                </Card>
              </Col>
            ))}

        {limit && (
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col xs={20} md={10} lg={6}>
              <Button
                type="default"
                style={{ ...buttonStyle, height: 50 }}
                icon={<RiBaseStationLine />}
                onClick={() => navigate(`/appointments`)}
                block
              >
                <span style={{ marginLeft: 5 }}>Book an online vet now</span>
              </Button>
            </Col>
          </Col>
        )}
      </Row>
    </ConfigProvider>
  );
};

export default OurServices;
