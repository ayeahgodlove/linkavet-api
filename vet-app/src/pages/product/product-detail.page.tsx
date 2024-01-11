import { Col, Divider, FloatButton, Row, Tooltip, Typography } from "antd";
import { ProductBanner } from "components/product/product-banner.component";
import GridView from "components/product/product-card-grid.component";
import ProductDetail from "components/product/product-detail.component";
import BackButton from "components/shared/back-button.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsersAsync } from "redux/user.slice";

const ProductDetailPage: React.FC = () => {
  const { products } = useProduct();
  const { cartQuantity } = useShoppingCart();
  const router = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsersAsync() as any);
  }, []);
  return (
    <GeneralAppShell> 
      <ProductBanner />
      <Row justify={"center"} align={"middle"}>
        <Col span={23}>
          <PageBreadCrumbs items={["Pages", "Products", "Details"]} />
          <BackButton title="Products" />
        </Col>
      </Row>
      <Row justify={"center"} align={"middle"}>
        <Col span={23}>
          <ProductDetail />
        </Col>
      </Row>
      <Col span={24} style={{ marginTop: 30 }}>
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
      {cartQuantity > 0 && (
        <FloatButton
          tooltip={<span>{cartQuantity} in the Shopping Cart</span>}
          icon={<FiShoppingCart />}
          type="primary"
          onClick={() => router("/shopping-cart")}
        />
      )}
    </GeneralAppShell>
  );
};

export default ProductDetailPage;
