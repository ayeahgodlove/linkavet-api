import { Card, Col, Row } from "antd";
import ProductStepEditForm from "../../../components/admin/product/product-edit-form.component";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/category.slice";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";

const ProductEditPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, []);

  return (
    <>
      <Row align={"top"} justify={"center"} style={{ margin: "4rem 0" }}>
        <Col xs={24} md={20} lg={16}>
          <PageBreadCrumbs items={["Products", "Edit"]} />

          <TitleBar title={"Products"} subTitle={"Edit a Product"} />
          <BackButton title="Products" />
        </Col>
        <Col xs={24} md={20} lg={16}>
          <Card bordered={false}>
            <ProductStepEditForm />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductEditPage;
