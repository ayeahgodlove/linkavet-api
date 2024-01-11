import { IBanner } from "models/banner";
import React, { useEffect, useState } from "react";
import { bannerService } from "services/banner.service";
import {
  Button,
  Card,
  Carousel,
  Col,
  Row,
  Space,
  Typography,
  Image,
} from "antd";
import {
  API_URL_UPLOADS_BANNERS,
  API_URL_UPLOADS_PRODUCTS,
} from "config/constant";
import "./product-banner.style.scss";
import TweenOne from "rc-tween-one";
import Texty from "rc-texty";
import { useTween } from "hooks/shared/tween.hook";
import { FiSearch } from "react-icons/fi";
import ProductFilterComponent from "./product-filter.component";
import { useProduct } from "hooks/product.hook";

const { Title, Paragraph } = Typography;
const ProductBannerComponent = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
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
    const getBanners = async () => {
      const banners = await bannerService.list();
      setBanners(banners.data);
      return banners;
    };

    getBanners();
  }, []);
  return (
    <div className="product-container">
      <Row className="product-banner" align={"middle"} justify={"center"}>
        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{ background: "none", boxShadow: "none" }}
            className="product-banner-text"
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
                Some product listings...
              </Texty>
            </Title>

            <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
              <Texty
                className="product-content"
                type="bottom"
                split={getSplit as any}
                delay={2200}
                interval={30}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem corrupti mollitia quam dolorum nostrum natus?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus ab illo libero quibusdam ipsa sapiente nobis, dicta
                quam inventore rerum!
              </Texty>
            </Paragraph>

            <Button type="link" htmlType="button">
              <Space align="center">
                <FiSearch size={23} style={{ marginTop: 5 }} />
                <span>Browse products</span>
              </Space>
            </Button>
          </Card> 
        </Col>
        <Col xs={24} md={8} className="product-column">
          <Carousel
            autoplay
            className="product-banner-carousel"
          >
            {banners.map((image) => (
              <div
                key={image.id}
                style={{
                  display: "block",
                  background: "none",
                }}
                className="product-banner-photo"
              >
                <div>
                  <div className="box">
                    <img
                      style={{
                        // objectFit: "cover",
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

      {/* search component */}
      <ProductFilterComponent />
    </div>
  );
};

export default ProductBannerComponent;

export const ProductBanner = () => {
  const { product } = useProduct();

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      <Col xs={23} md={23.5}>
        <Card
          bordered={false}
          style={{ boxShadow: "none" }}
          bodyStyle={{ padding: 0 }}
          className="product-banner-2"
        >
          <Carousel autoplay dotPosition={"right"}>
            {product.productImages.map((image) => (
              <div key={image.id}>
                <img
                  alt={image.title}
                  src={`${API_URL_UPLOADS_PRODUCTS}/${image.imageUrl}`}
                />
              </div>
            ))}
          </Carousel>
          <div className="overlay"></div>
        </Card>
      </Col>
    </Row>
  );
};
