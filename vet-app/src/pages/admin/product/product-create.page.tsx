import { Card, Col, Row } from "antd";
import ProductCreateForm from "../../../components/admin/product/product-create-form.component";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/category.slice";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";

const ProductCreatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, []);

  return (
    <>
      <Row align={"top"} justify={"center"} style={{ margin: "4rem 0" }}>
        <Col xs={24} md={20} lg={16}>
          <PageBreadCrumbs items={["Products", "Create"]} />

          <TitleBar title={"Products"} subTitle={"Create a product"} />
          <BackButton title="Products" />
        </Col>
        <Col xs={24} md={20} lg={16}>
          <Card bordered={false}>
            <ProductCreateForm />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductCreatePage;
