import { Card, Carousel, Col, ConfigProvider, Row, Typography } from "antd";
import { SpinnerComponent } from "components/shared/spinner";
import React from "react";
import theme from "utils/themeConfig";
import "pure-react-carousel/dist/react-carousel.es.css";
import useWindowSize from "hooks/shared/window-resize.hook";
import { Helmet } from "react-helmet-async";

const banners = [
  {
    title: "linkavet vet staff group one",
    img: "./team/back1.jpg",
  },
  {
    title: "linkavet vet staff group two",
    img: "./team/back2.jpg",
  },
  {
    title: "linkavet vet staff group three",
    img: "./team/back3.jpg",
  },
  {
    title: "linkavet vet staff group four",
    img: "./team/back4.jpg",
  },
];

const AboutUsPages = () => {
  const { width } = useWindowSize();
  return (
    <>
      <Helmet>
        <title>
          Meet the Heart Behind Linkavet - Where Passion Meets Pet Care
          Excellence
        </title>
        <meta
          name="description"
          content="Welcome to Linkavet, where our love for animals and commitment to exceptional pet care converge. Meet our team of dedicated veterinary professionals, each driven by a passion for ensuring the health and happiness of your beloved pets. Learn about our values, mission, and the personalized approach we bring to every veterinary service and product we offer. Discover the faces behind the care, and trust Linkavet as your partner in creating a thriving and joyful life for your furry companions."
        />
      </Helmet>
      <ConfigProvider theme={theme}>
        <Row gutter={[16, 16]} align={"middle"} justify={"center"}>
          <Col xs={24} md={24}>
            {banners && banners.length < 1 ? (
              <SpinnerComponent
                message={"banners loading..."}
                height={"200vh"}
              />
            ) : (
              <Card bordered={false} bodyStyle={{ padding: 0 }}>
                <Row justify={"center"} gutter={[16, 16]}>
                  <Col xs={24} md={14}>
                    <Carousel autoplay>
                      {banners.map((banner, index) => (
                        <div key={index} style={{ width: "100%" }}>
                          <img
                            key={index}
                            style={{
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center center",
                              aspectRatio: "1/1",
                              width: "100%",
                              height: "450px",
                              objectFit: "cover",
                            }}
                            alt={banner.title}
                            src={`${banner.img}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </Col>

                  <Col xs={24} md={10}>
                    <div
                      style={{
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Title
                        level={2}
                        // style={{ color: "#02441c" }}
                        className="gradient-title gradient-title-font"
                      >
                        Your Trusted Partner in Pet Care
                      </Typography.Title>
                      <Typography.Title level={5}>
                        Discover a World Where Your Pets are Always a Priority
                      </Typography.Title>
                      <p>
                        At LinkaVet.com, we're more than just a platform; we're
                        a community dedicated to providing everything your pet
                        needs to live a happy, healthy life. From essential
                        supplies in our comprehensive e-commerce store to
                        expert-led courses designed to empower pet owners, and
                        personalized vet consultations accessible from the
                        comfort of your home, we're here to ensure your furry,
                        feathered, or scaled friends receive the best care
                        possible.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          </Col>

          <Col xs={22} style={{ margin: "20px 0" }}>
            <Typography.Title
              level={3}
              style={{ textAlign: "center", marginTop: 30 }}
              className="gradient-title gradient-title-font"
            >
              Empower, Engage, and Elevate Your Pet Care Experience{" "}
            </Typography.Title>
            <Typography.Paragraph>
              Join us on a journey to redefine pet care. Because at LinkaVet, we
              believe every pet deserves the best. This banner text aims to be
              welcoming and informative, highlighting the unique selling points
              of LinkaVet.com without overwhelming the reader with too much
              detail. The message focuses on the community aspect, the
              comprehensive nature of the services (e-commerce, education, and
              consultation), and the commitment to pet well-being, which can
              resonate with pet owners looking for a reliable, all-in-one
              resource for their pet care needs.
            </Typography.Paragraph>
          </Col>
        </Row>
      </ConfigProvider>
    </>
  );
};

export default AboutUsPages;
