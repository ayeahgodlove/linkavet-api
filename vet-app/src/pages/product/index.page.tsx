import { Card, Col, Divider, FloatButton, Row, Typography } from "antd";
import CategoryList from "components/admin/category/category-list.component";
import TagList from "components/admin/tag/tag-list.component";
import BannerIndexComponent from "components/product/product-banner.component";
import ProductList from "components/product/product-list.component";
import { SpinnerComponent } from "components/shared/spinner";
import useWindowSize from "hooks/shared/window-resize.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import { IProduct } from "models/product.model";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchproductSuccess } from "redux/product.slice";

const ProductPage: React.FC = () => {
  const router = useNavigate();
  const { cartQuantity } = useShoppingCart();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const getProducts = useCallback(async (): Promise<IProduct[]> => {
    setLoading(true);
    const response = await fetch("/api/products");
    const { data } = await response.json();
    return data;
  }, []);

  useEffect(() => {
    (async () => {
      const productDATas = await getProducts();
      dispatch(fetchproductSuccess([...productDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Products loading..." height="100vh" />;
  }

  return (
    <GeneralAppShell>
      <Helmet>
        <title>
          Explore Premium Vet Products - Your Pet's Wellbeing, Our Priority
        </title>
        <meta
          name="description"
          content="Browse through a carefully curated collection of vet-approved products at Linkavet. Elevate your pet's lifestyle with our premium range of nutrition, grooming essentials, toys, and wellness products. Each item is selected with your pet's health and happiness in mind. Shop confidently for top-quality products that complement our commitment to excellence in veterinary care. Enhance your pet's life today with Linkavet."
        />
      </Helmet>
      {/* banner */}
      <BannerIndexComponent />

      {/* Branding Information */}

      {/* product list */}
      <Row
        justify={"space-between"}
        align={"top"}
        style={{ marginTop: 20, padding: "0 2rem" }}
        gutter={[8, 8]}
      >
        <Col xs={24} md={20}>
          <ProductList />
        </Col>

        {width >= 768 && (
          <Col xs={24} md={4}>
            <Card bordered={false} size="small">
              <Typography.Text style={{ marginBottom: 0 }}>
                Filter By
              </Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 2 }}>
                CATEGORIES
              </Typography.Title>
              <Divider style={{ margin: "10px 0" }} />
              {/* Categories display */}
              <CategoryList />

              <Divider style={{ margin: "25px 0" }} />
              <Typography.Text style={{ marginBottom: 0, marginTop: 5 }}>
                Filter By
              </Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 2 }}>
                TAGS
              </Typography.Title>
              <Divider style={{ margin: "10px 0" }} />
              <TagList />
              <Divider />
            </Card>
          </Col>
        )}
      </Row>
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

export default ProductPage;
