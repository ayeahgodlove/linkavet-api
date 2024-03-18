import { Card, Carousel, Col, ConfigProvider, Row, Typography } from "antd";
import { SpinnerComponent } from "components/shared/spinner";
import React from "react";
import theme from "utils/themeConfig";
import "pure-react-carousel/dist/react-carousel.es.css";
import useWindowSize from "hooks/shared/window-resize.hook";
import { Helmet } from "react-helmet-async";

const teamMembers = [
  {
    name: "John Roe",
    role: "CEO",
    description:
      "John is the CEO of our company with over 20 years of experience.",
    img: "./team/profile.jpg",
  },
  {
    name: "Jane Rich",
    role: "CTO",
    description: "Jane leads our technology strategy and development.",
    img: "./team/prof2.jpg",
  },
  {
    name: "John Doe",
    role: "CEO",
    description:
      "John is the CEO of our company with over 20 years of experience.",
    img: "./team/prof3.jpg",
  },
  {
    name: "Jane Doe",
    role: "CTO",
    description: "Jane leads our technology strategy and development.",
    img: "./team/profile.jpg",
  },
];

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
                    <div style={{ padding: 24 }}>
                      <Typography.Title level={3} style={{ color: "#02441c" }}>
                        Your Trusted Partner in Pet Care
                      </Typography.Title>
                      <Typography.Title level={5}>
                        Discover a World Where Your Pets are Always a Priority
                      </Typography.Title>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            "At LinkaVet.com, we're more than just a platform; we're a community dedicated to providing everything your pet needs to live a happy, healthy life. From essential supplies in our comprehensive e-commerce store to expert-led courses designed to empower pet owners, and personalized vet consultations accessible from the comfort of your home, we're here to ensure your furry, feathered, or scaled friends receive the best care possible.",
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          </Col>

          <Col xs={22} style={{ margin: "20px 0" }}>
            <Typography.Title
              level={3}
              style={{ textAlign: "center", marginTop: 30, color: "#02441c" }}
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

            <Typography.Title
              level={3}
              style={{ textAlign: "center", marginTop: 30, color: "#02441c" }}
            >
              Meet the Team
            </Typography.Title>
            <Row gutter={[8, 8]} align={"middle"} justify={"center"}>
              {teamMembers.map((member) => (
                <Col xs={24} md={6} key={member.name}>
                  <Card
                    hoverable
                    style={{
                      width: width > 767 ? 300 : "100%",
                      marginBottom: 10,
                    }}
                    cover={
                      <img
                        alt={member.name}
                        style={{ height: 240, objectFit: "cover" }}
                        src={member.img}
                      />
                    }
                  >
                    <Card.Meta title={member.name} description={member.role} />
                    <Typography.Paragraph>
                      {member.description}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row
          gutter={[16, 16]}
          align={"middle"}
          justify={"center"}
          style={{ margin: "0 2rem" }}
        >
          <Col xs={24}>
            <Typography.Title
              level={3}
              style={{ textAlign: "center", marginTop: 30, color: "#02441c" }}
            >
              Crafting the LinkaVet.com Experience
            </Typography.Title>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable bordered={false}>
              <Typography.Title level={5} style={{ color: "#02441c" }}>
                Identifying the Need
              </Typography.Title>
              <Typography.Text>
                The journey of LinkaVet.com began with a simple observation: pet
                owners often navigate a fragmented landscape when seeking
                products, advice, and healthcare for their pets. We envisioned a
                unified platform that caters to all aspects of pet care - a
                single destination for quality products, educational content,
                and expert consultations.
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable bordered={false}>
              <Typography.Title level={5} style={{ color: "#02441c" }}>
                {" "}
                Building the Foundation
              </Typography.Title>
              <Typography.Text>
                With our goal in mind, we embarked on extensive research to
                understand pet owners' challenges, desires, and expectations.
                This phase involved engaging with veterinarians, pet care
                professionals, and pet owners themselves to gather insights that
                would form the bedrock of our services.
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable bordered={false}>
              <Typography.Title level={5} style={{ color: "#02441c" }}>
                Developing the Platform
              </Typography.Title>
              <Typography.Text>
                Leveraging cutting-edge technology and design thinking, we
                developed LinkaVet.com to be intuitive, user-friendly, and
                comprehensive. Our e-commerce section offers a curated selection
                of products, our courses platform provides access to expert
                knowledge, and our vet consultation service ensures professional
                advice is just a click away.
              </Typography.Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable bordered={false}>
              <Typography.Title level={5} style={{ color: "#02441c" }}>
                Curating Our Offerings
              </Typography.Title>
              <Typography.Text>
                Every product, course, and vet partner on LinkaVet.com is
                meticulously selected based on stringent criteria for quality,
                relevance, and value. We prioritize offerings that align with
                our mission of promoting pet health, happiness, and well-being.
              </Typography.Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable bordered={false}>
              <Typography.Title level={5} style={{ color: "#02441c" }}>
                Launching and Learning
              </Typography.Title>
              <Typography.Text>
                Launching LinkaVet.com was just the beginning. We believe in
                continuous improvement, driven by feedback from our community
                and the latest advancements in pet care. Our commitment to
                learning and adapting ensures we remain at the forefront of pet
                care innovation.
              </Typography.Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable bordered={false}>
              <Typography.Title level={5} style={{ color: "#02441c" }}>
                Looking to the future
              </Typography.Title>
              <Typography.Text>
                As LinkaVet.com grows, so does our vision. We are constantly
                exploring new ways to expand our services, enhance our platform,
                and deepen our impact on the lives of pets and their owners.
                With every step, we remain dedicated to our founding principle:
                to empower, engage, and elevate your pet care experience.
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </ConfigProvider>
    </>
  );
};

export default AboutUsPages;
