import { Card, Col, Row } from "antd";
import ProductStepForm from "components/admin/product/product-set-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "redux/category.slice";

const ProductCreatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, []);

  return (
    <Row align={"top"} justify={"center"} style={{ margin: "4rem 0" }}>
      <Col xs={24} md={20} lg={16}>
        <Card bordered={false}>
          <ProductStepForm formMode={UpdateMode.ADD} />
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCreatePage;
