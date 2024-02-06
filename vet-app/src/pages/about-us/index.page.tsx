import { Card, Col, ConfigProvider, Image, Row, Typography } from "antd";
import { SpinnerComponent } from "components/shared/spinner";
import { API_URL_UPLOADS_BANNERS } from "config/constant";
import { useBanner } from "hooks/banner.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import React, { useEffect } from "react";
import theme from "utils/themeConfig";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  BiChart,
  BiDevices,
  BiLocationPlus,
  BiSolidUser,
  BiUserCircle,
} from "react-icons/bi";

const AboutUsPages = () => {
  // const [banners, setBanners] = useState<IBanner[]>([]);
  const { banners } = useBanner();

  useEffect(() => {
    // const getBanners = async () => {
    //   const banners = await bannerService.list();
    //   setBanners(banners.data);
    //   return banners;
    // };
    // getBanners();
  }, []);
  // console.log("banners: ", banners);

  return (
    <GeneralAppShell>
      <ConfigProvider theme={theme}>
        <div style={{ margin: "3rem 0" }}>
          <Row gutter={[16, 16]} align={"middle"} justify={"center"}>
            <Col xs={22} md={22}>
              {banners && banners.length < 1 ? (
                <SpinnerComponent
                  message={"banners loading..."}
                  height={"200vh"}
                />
              ) : (
                <Card
                  bodyStyle={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Row gutter={[16, 8]}>
                    <Col xs={24} md={14}>
                      <CarouselProvider
                        naturalSlideWidth={10}
                        naturalSlideHeight={6}
                        totalSlides={banners.length}
                      >
                        <Slider>
                          {banners.map((banner, index) => (
                            <Slide index={index} key={index}>
                              <Image
                                style={{
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center center",
                                  aspectRatio: "1/1",
                                  width: "100%",
                                  height: "350px",
                                  objectFit: "cover",
                                }}
                                alt={banner.title}
                                src={`${API_URL_UPLOADS_BANNERS}/${banner.image}`}
                              />
                            </Slide>
                          ))}
                        </Slider>
                      </CarouselProvider>
                    </Col>
                  </Row>

                  <Col xs={24} md={8}>
                    <Typography.Title level={5}>
                      Looking for us? Contact us.
                    </Typography.Title>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          "Can't find your answer here? Call us at +237673687549 or email us at linkavet.support@gmail.com",
                      }}
                    />
                  </Col>
                </Card>
              )}
            </Col>

            <Col xs={22} md={5}>
              <Card bordered={false}>
                <BiChart size={25} />
                <Typography.Title level={5}>
                  Strategy Solutions
                </Typography.Title>
                <Typography.Text>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </Typography.Text>
              </Card>
            </Col>

            <Col xs={22} md={5}>
              <Card bordered={false}>
                <BiUserCircle size={25} />
                <Typography.Title level={5}>Dedicated Support</Typography.Title>
                <Typography.Text>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </Typography.Text>
              </Card>
            </Col>

            <Col xs={22} md={5}>
              <Card bordered={false}>
                <BiDevices size={25} />
                <Typography.Title level={5}>Digital Design</Typography.Title>
                <Typography.Text>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </Typography.Text>
              </Card>
            </Col>

            <Col xs={22} md={5}>
              <Card bordered={false}>
                <BiLocationPlus size={25} />
                <Typography.Title level={5}>
                  Strategy Solutions
                </Typography.Title>
                <Typography.Text>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </Typography.Text>
              </Card>
            </Col>

            {/* <Col xs={24} md={22}>
              <CarouselProvider
                naturalSlideWidth={10}
                naturalSlideHeight={6}
                totalSlides={3}
              >
                <Slider>
                  <Slide index={0}>
                    <Card
                      bordered={false}
                      cover={
                        <img
                          src="images/banner.png"
                          alt="doctors standing with pets"
                        />
                      }
                    >
                      <Typography.Title level={5}>
                        Strategy Solutions
                      </Typography.Title>
                      <Typography.Text>
                        It is a long established fact that a reader will be
                      </Typography.Text>
                    </Card>
                  </Slide>
                  <Slide index={1}>
                    <Card
                      bordered={false}
                      cover={
                        <img
                          src="images/bg-1.png"
                          alt="doctors standing with pets"
                        />
                      }
                    >
                      <Typography.Title level={5}>
                        Strategy Solutions
                      </Typography.Title>
                      <Typography.Text>
                        It is a long established fact that a reader will be
                      </Typography.Text>
                    </Card>
                  </Slide>
                </Slider>
              </CarouselProvider>
            </Col> */}
          </Row>
        </div>
      </ConfigProvider>
    </GeneralAppShell>
  );
};

export default AboutUsPages;
