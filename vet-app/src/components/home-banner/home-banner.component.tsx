import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Row,
  Space,
} from "antd";
import "./home-banner.style.scss";
import "rc-texty/assets/index.css";
import TweenOne from "rc-tween-one";
import Texty from "rc-texty";
import { FiChevronRight } from "react-icons/fi";
import { useTween } from "hooks/shared/tween.hook";

export const HomeBanner: React.FC = () => {
  const [show, setShow] = useState(true);

  const { getEnter, getInterval} = useTween();
  const getSplit = (props:any) => {
    const t = props.split(" ");
    const c: React.ReactElement[] = [];
    t.forEach((str, i) => {
      c.push(<span key={`${str}-${i}`}>{str}</span>);
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`}> </span>);
      }
    });
    return c;
  };
  useEffect(() => {
    setShow(true);
  }, [show]);
  return (
    <Card
      bordered={false}
      style={{ borderRadius: 0, paddingTop: "8rem", paddingBottom: "8rem" }}
      className="combined-wrapper"
    >
      <Row justify={"center"} align={"middle"} gutter={[8, 8]}>
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className=""
        >
          <div className="gallery">
            <img
              src="./images/banner-removebg-preview.png"
              alt="landing page image"
            />
          </div>
        </Col>
        <Col xs={24} md={13} lg={13}>
          {show && (
            <div className="combined">
              <div className="combined-shape">
                <div className="shape-left">
                  <TweenOne
                    animation={[
                      {
                        x: 158,
                        type: "from",
                        ease: "easeInOutQuint",
                        duration: 600,
                      },
                      {
                        x: -158,
                        ease: "easeInOutQuart",
                        duration: 450,
                        delay: -150,
                      },
                    ]}
                  />
                </div>
                <div className="shape-right">
                  <TweenOne
                    animation={[
                      {
                        x: -158,
                        type: "from",
                        ease: "easeInOutQuint",
                        duration: 600,
                      },
                      {
                        x: 158,
                        ease: "easeInOutQuart",
                        duration: 450,
                        delay: -150,
                      },
                    ]}
                  />
                </div>
              </div>

              <Texty
                className="rc-texty_title"
                type="mask-top"
                delay={400}
                enter={getEnter}
                interval={getInterval}
                component={TweenOne}
                componentProps={{
                  animation: [
                    { x: 130, type: "set" },
                    { x: 100, delay: 500, duration: 450 },
                    {
                      ease: "easeOutQuart",
                      duration: 300,
                      x: 0,
                    },
                    {
                      letterSpacing: 0,
                      delay: -300,
                      scale: 0.9,
                      ease: "easeInOutQuint",
                      duration: 1000,
                    },
                    {
                      scale: 1,
                      width: "100%",
                      delay: -300,
                      duration: 1000,
                      ease: "easeInOutQuint",
                    },
                  ],
                }}
                // mode="sync"
              >
                LinkaVet
              </Texty>
              <TweenOne
                className="combined-bar"
                animation={{
                  delay: 2000,
                  width: 0,
                  x: 158,
                  type: "from",
                  ease: "easeInOutExpo",
                }}
              />

              <Texty
                className="content sub-header"
                type="bottom"
                split={getSplit as any}
                delay={2200}
                interval={30}
              >
                Link to a Veterinary professional within and without the
                national territory.
              </Texty>
            </div>
          )}
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#317610",
                  colorLink: "#2980b9",
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{
                  paddingLeft: 25,
                  paddingRight: 25,
                  fontSize: 18,
                  borderRadius: 50,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 10 }}>
                    Get Started
                  </div>{" "}
                  <div>
                    <FiChevronRight size={25} />
                  </div>
                </div>
              </Button>
            </ConfigProvider>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
