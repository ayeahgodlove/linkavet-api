import { Card, Col, List, Row, Typography, Image, Tag } from "antd";
import { API_URL_UPLOADS_PRODUCTS } from "config/constant";
import { useProduct } from "hooks/product.hook";
import React from "react";
import { format } from "utils/format";

const ProductDetailComponent: React.FC = () => {
  const { product, getProductTags } = useProduct();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: product.id,
          },
          {
            label: "Name",
            value: product.name,
          },
          {
            label: "ShortDescription",
            value: product.shortDescription,
          },
          {
            label: "Description",
            value: (
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            ),
          },
          {
            label: "Category",
            value: product.categoryId,
          },
          {
            label: "Image",
            value: (
              <Row gutter={[8, 8]}>
                {product.productImages.map((image) => (
                  <Col key={image} xs={24} md={6}>
                    <Card bordered={false}>
                      <Image
                        src={`${API_URL_UPLOADS_PRODUCTS}/${image}`}
                        alt={image}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ),
          },
          {
            label: "Tags",
            value: getProductTags(product).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            )),
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProductDetailComponent;
