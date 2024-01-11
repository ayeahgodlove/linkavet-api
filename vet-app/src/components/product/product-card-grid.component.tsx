import { Button, Card, Carousel, Col, List } from "antd";
import { IProduct } from "models/product.model";
import React from "react";
import "./product.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
import { API_URL_UPLOADS_PRODUCTS } from "config/constant";
import { NoContent } from "components/shared/no-content/no-content.component";
import ProductAddToCart from "./product-add-to-cart.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useProduct } from "hooks/product.hook";

const { Meta } = Card;
interface IProp {
  product: IProduct;
  onClickProduct: (productId: string) => void;
}

interface IProps {
  products: IProduct[];
  resultProducts: IProduct[];
  classProp?: boolean;
}
const GridView: React.FC<IProps> = ({
  products,
  resultProducts,
  classProp = false,
}) => {
  const { setProduct } = useProduct();
  const handleClickProduct = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    setProduct(product!);
  };
  return (
    <>
      {products && products.length > 0 ? (
        <List
          className={classProp ? "" : "product-list"}
          grid={{
            gutter: 0,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={
            resultProducts && resultProducts.length > 0
              ? resultProducts
              : products
          }
          renderItem={(product) => (
            <GridProductCard
              key={product.id}
              product={product}
              onClickProduct={handleClickProduct}
            />
          )}
        />
      ) : (
        <Col span={24}>
          <NoContent title="No products to display at the moment" />
        </Col>
      )}
    </>
  );
};

export const GridProductCard: React.FC<IProp> = ({
  product,
  onClickProduct,
}) => {
  return (
    <>
      <List.Item
        key={product.id}
        className="product-list-item"
        style={{ padding: "4px 8px" }}
      >
        <Card
          bordered={false}
          style={{ padding: 0 }}
          bodyStyle={{
            paddingTop: 15,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
          }}
          cover={
            <Carousel
              autoplay
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              {product.productImages.map((image) => (
                <img
                  key={image}
                  style={{
                    // objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    width: "100%",
                  }}
                  alt={product.shortDescription}
                  src={`${API_URL_UPLOADS_PRODUCTS}/${image}`}
                />
              ))}
            </Carousel>
          } //can implement banner for product cover
          className="product-card"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: 120 }}>
              <Meta
                title={
                  <Link
                    to={`/products/${slugify(product.name, { lower: true })}`}
                    onClick={() => onClickProduct(product.id)}
                  >
                    {product.name}
                  </Link>
                }
                description={<RaterComponent />}
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ marginBottom: 5 }}>
                <b>{"$" + product.amount}</b>
              </p>
              {/* product add-to-cart */}
              <ProductAddToCart product={product} />
            </div>
          </div>
          <Button
            type="link"
            className="add-to-fav-btn"
            icon={<RiHeartFill size={30} className="add-to-fav" />}
          />
        </Card>
      </List.Item>
    </>
  );
};

export default GridView;
