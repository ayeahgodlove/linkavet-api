import { Card, Col, Row } from "antd";
import ProductStepEditForm from "components/admin/product/product-set-form-edit.component";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "redux/category.slice";

const ProductEditPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, []);

  return (
    <Row align={"top"} justify={"center"} style={{ margin: "4rem 0" }}>
      <Col xs={24} md={20} lg={16}>
        <Card bordered={false}>
          <ProductStepEditForm />
        </Card>
      </Col>
    </Row>
  );
};

export default ProductEditPage;
