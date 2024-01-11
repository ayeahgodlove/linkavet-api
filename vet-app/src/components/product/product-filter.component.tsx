import { Col } from "antd";
import React from "react";
import { DebounceSelectComponent } from "./deboune-search.component";
import "./product-filter.style.scss";

const ProductFilterComponent: React.FC = () => {
  return (
    <Col
      style={{ margin: "0 auto"}}
      sm={18}
      md={18}
      lg={15}
      xl={15}
      className="product-filter"
    >
      <DebounceSelectComponent />
    </Col>
  );
};

export default ProductFilterComponent;
