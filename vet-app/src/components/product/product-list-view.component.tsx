import { Card, Col, List, Row, Typography } from "antd";
import { IProduct } from "models/product.model";
import React from "react";
import "./product.style.scss";
import RaterComponent from "components/shared/rate.component";
import { API_URL_UPLOADS_PRODUCTS } from "config/constant";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./product-list-view.style.scss";
import ProductAddToCart from "./product-add-to-cart.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useProduct } from "hooks/product.hook";

interface IProp {
  product: IProduct;
  showSlides?: boolean;
  onClickProduct: (productId: string) => void;
}

interface IProps {
  products: IProduct[];
  resultProducts: IProduct[];
  showSlides?: boolean;
}
const ListView: React.FC<IProps> = ({
  products,
  resultProducts,
  showSlides = false,
}) => {
  const { setProduct } = useProduct();
  const handleClickProduct = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    setProduct(product!);
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={
        resultProducts && resultProducts.length > 0 ? resultProducts : products
      }
      renderItem={(item) => (
        <Card
          key={item.id}
          bordered={false}
          style={{ marginTop: 10 }}
          bodyStyle={{ padding: 0 }}
        >
          <ListViewProduct
            product={item}
            showSlides={showSlides}
            onClickProduct={handleClickProduct}
          />
        </Card>
      )}
    />
  );
};
const ListViewProduct: React.FC<IProp> = ({
  product,
  showSlides = false,
  onClickProduct,
}) => {
  return (
    <List.Item key={product.id}>
      <Row gutter={[16, 8]}>
        <Col xs={24} md={10}>
          <CarouselProvider
            naturalSlideWidth={10}
            naturalSlideHeight={6}
            totalSlides={product.productImages.length}
          >
            <Row gutter={[8, 8]} align={"middle"} justify={"center"}>
              {!showSlides && (
                <Col span={6}>
                  {product.productImages.map((image, index) => {
                    return (
                      <Dot
                        slide={index}
                        key={index}
                        className={"product-list_dot"}
                      >
                        <img
                          height={80}
                          width={80}
                          key={index}
                          src={`${API_URL_UPLOADS_PRODUCTS}/${image}`}
                        />
                      </Dot>
                    );
                  })}
                </Col>
              )}
              <Col span={!showSlides ? 18 : 24}>
                <Slider>
                  {product.productImages.map((image, index) => (
                    <Slide index={index} key={index}>
                      <Image
                        style={{
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          aspectRatio: "1/1",
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                        alt={product.shortDescription}
                        src={`${API_URL_UPLOADS_PRODUCTS}/${image}`}
                        hasMasterSpinner={false}
                      />
                    </Slide>
                  ))}
                </Slider>
              </Col>
            </Row>
          </CarouselProvider>
        </Col>
        <Col
          xs={24}
          md={14}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography.Title level={5}>
            <Link
              to={`/products/${slugify(product.name, { lower: true })}`}
              onClick={() => onClickProduct(product.id)}
            >
              {product.name}
            </Link>
          </Typography.Title>
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
          <Row justify={"center"} align={"top"}>
            <Col xs={12}>
              <RaterComponent fontSize={20} />
            </Col>

            <Col
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p style={{ marginBottom: 5 }}>
                <b>{"$" + product.amount}</b>
              </p>
              <ProductAddToCart product={product} />
            </Col>
          </Row>
        </Col>
      </Row>
    </List.Item>
  );
};

export default ListView;
