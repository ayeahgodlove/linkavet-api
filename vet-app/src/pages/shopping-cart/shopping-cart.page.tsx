import { Button, Card, Col, Divider, Row, Typography } from "antd";
import GridView from "components/product/product-card-grid.component";
import ListView from "components/product/product-list-view.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PiEqualsLight } from "react-icons/pi";
import { TiTimes } from "react-icons/ti";
import CheckoutSummaryComponent from "components/product/checkout-summary.component";

const ShoppingCartPage: React.FC = () => {
  const { cartItems, findMatchingProducts, cartQuantity } = useShoppingCart();
  const { products } = useProduct();
  const router = useNavigate();

  const matchingProducts = findMatchingProducts(products, cartItems);

  console.log(matchingProducts);
  const handleCheckout = () => {
    router("/payment/checkout");
  };
  return (
    <GeneralAppShell>
      <div style={{ padding: "0 2rem", marginBottom: 50 }}>
        <Row gutter={[8, 16]} style={{ marginTop: 50, padding: "0 1rem" }}>
          <Col span={24}>
            <Typography.Title
              level={2}
              style={{ textAlign: "center", opacity: 0.89 }}
            >
              Shopping Cart
            </Typography.Title>
            <Typography.Paragraph
              style={{ fontWeight: "bold", marginBottom: 0 }}
            >
              {cartItems.length || 0} in Cart
            </Typography.Paragraph>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          </Col>
          <Col xs={22} md={16}>
            {cartItems && cartItems.length > 0 ? (
              <ListView
                products={matchingProducts}
                showSlides={true}
                resultProducts={[]}
              />
            ) : (
              <NoContent title="Your shopping cart is empty at the moment" />
            )}
          </Col>
          <Col xs={22} md={8}>
            <Card bordered={false} title={<CheckoutSummaryComponent />}>
              <Button
                type="primary"
                onClick={handleCheckout}
                htmlType="button"
                size="large"
                block
              >
                Checkout
              </Button>
            </Card>
          </Col>
        </Row>
        <Col span={24} style={{ marginTop: 50 }}>
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            You may also like
          </Typography.Title>
          <Divider style={{ marginTop: 0 }} />
        </Col>
        {products && products.length > 0 ? (
          <GridView products={products} resultProducts={[]} />
        ) : (
          <NoContent title="Your shopping cart is empty at the moment" />
        )}
      </div>
    </GeneralAppShell>
  );
};

export default ShoppingCartPage;
