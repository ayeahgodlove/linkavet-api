import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row, Space, Typography } from "antd";
import { FiSearch } from "react-icons/fi";
import TweenOne from "rc-tween-one";
import Texty from "rc-texty";
import { useTween } from "hooks/shared/tween.hook";
import { API_URL_UPLOADS_BANNERS } from "config/constant";
import { bannerService } from "services/banner.service";
import { IBanner } from "models/banner";
import "./page-banner.scss";

type Props = {
  title: string;
  description: string;
  linkCmd: string;
};
const PageBannerComponent: React.FC<Props> = ({
  title,
  description,
  linkCmd,
}) => {
  const { Title, Paragraph } = Typography;
  const { getEnter, getInterval } = useTween();
  const [banners, setBanners] = useState<IBanner[]>([]);

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
    const getBanners = async () => {
      const banners = await bannerService.list();
      setBanners(banners.data);
      return banners;
    };

    getBanners();
  }, []);

  return (
    <Row className="page-banner" align={"middle"} justify={"center"}>
      <Col xs={24} md={16}>
        <Card
          bordered={false}
          style={{ background: "none", boxShadow: "none" }}
          className="page-banner-text"
        >
          <Title
            style={{
              color: "#f4f4f4",
              textShadow: "0px 5px 10px 0px rgba(177, 202, 215, 0.8)",
              marginBottom: 0,
            }}
            level={1}
          >
            <Texty
              type="bounce"
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
              {title}
            </Texty>
          </Title>

          <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
            <Texty
              className="page-content"
              type="bottom"
              split={getSplit as any}
              delay={2200}
              interval={30}
            >
              {description}
            </Texty>
          </Paragraph>

          <Button type="link" htmlType="button">
            <Space align="center">
              <FiSearch size={23} style={{ marginTop: 5 }} />
              <span>{linkCmd}</span>
            </Space>
          </Button>
        </Card>
      </Col>
      <Col xs={24} md={8} className="page-column">
        <Carousel autoplay className="page-banner-carousel">
          {banners.map((image) => (
            <div
              key={image.id}
              style={{ display: "block", background: "none" }}
              className="page-banner-photo"
            >
              <div>
                <div className="box">
                  <img
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      width: "100%",
                    }}
                    alt={image.title}
                    src={`${API_URL_UPLOADS_BANNERS}/${image.image}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default PageBannerComponent;
