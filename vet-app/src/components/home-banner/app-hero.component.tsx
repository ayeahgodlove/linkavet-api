import { Button, Carousel, Image, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./app-hero.style.scss";
import { useTween } from "hooks/shared/tween.hook";
import TweenOne from "rc-tween-one";
import Texty from "rc-texty";
import { FaPlay } from "react-icons/fa";
import useWindowSize from "hooks/shared/window-resize.hook";

const items = [
  {
    key: "1",
    title: "Shop Now for Quality Vet Products",
    content:
      "Browse our curated selection of top-tier veterinary products, handpicked to ensure the health and well-being of your beloved pets. From essential medications to premium animal care supplies, find everything you need to keep your animals happy and healthy.",
    url: "/products",
    label: "Browse Catalogue",
  },
  {
    key: "2",
    title: "Empower Your Farm's Health",
    content:
      "Linkavet invites you to optimize the well-being of your livestock and agricultural operations. From booking appointments with veterinary experts to scheduling consultations and general checkups, take proactive steps to ensure the health and vitality of your farm animals.",
    url: "/appointments",
    label: "Book an appointment",
  },
  {
    key: "3",
    title: "Invest in Your Farm's with Expert Training",
    content:
      "Elevate your farm's productivity and efficiency by investing in expert-led training programs tailored to agricultural best practices and innovative techniques.",
    url: "/our_services",
    label: "Find Out More",
  },
];

const AppHero = () => {
  const [show, setShow] = useState(true);

  const { width } = useWindowSize();
  const { getEnter, getInterval } = useTween();
  const getSplit = (props: any) => {
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
    <div id="hero" className="heroBlock">
      <Carousel autoplay className="app-hero-carousel">
        {items.map((item) => {
          return (
            <div key={item.key} className="container-fluid">
              <div className="content">
                <h1>
                  <Texty
                    className="gradient-title"
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
                  >
                    {item.title}
                  </Texty>
                </h1>
                <p>
                  <Texty
                    type="bottom"
                    split={getSplit as any}
                    delay={2200}
                    interval={30}
                  >
                    {item.content}
                  </Texty>
                </p>
                <div className="btnHolder">
                  <Space size={"large"}>
                    <Button
                      type="primary"
                      size="large"
                      href={item.url}
                      shape="round"
                    >
                      {item.label}
                    </Button>
                    {width > 767 && (
                      <Button size="large" type="default" shape="round">
                        <Space size={"small"}>
                          <span> Watch a Demo</span>
                          <FaPlay />
                        </Space>
                      </Button>
                    )}
                  </Space>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <div className="overlay">
        <div className="gallery">
          <img
            src="./images/banner-removebg-preview.png"
            alt="landing page image"
            style={{ height: "auto", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppHero;
