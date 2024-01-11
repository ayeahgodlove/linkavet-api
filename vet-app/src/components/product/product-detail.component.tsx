import { Card, Col, List, Row, Typography, Image, Tag, Button } from "antd";
import { API_URL_UPLOADS_PRODUCTS } from "config/constant";
import { useCategory } from "hooks/category.hook";
import { useProduct } from "hooks/product.hook";
import { useTag } from "hooks/tag.hook";
import React from "react";
import { generateShadesOfColor, tagColor } from "utils/tag-generator";
import ProductAddToCart from "./product-add-to-cart.component";

const ProductDetail: React.FC = () => {
  const { product, getProductTags } = useProduct();
  const { tags } = useTag();
  const { getCategory } = useCategory();

  const shades = generateShadesOfColor(tagColor, tags.length);
  return (
    <Card
      bordered={false}
      size="small"
      style={{ borderRadius: 0, marginBottom: 10 }}
      title={
        <Typography.Title level={4} style={{ marginBottom: 0 }}>
          Product Information
        </Typography.Title>
      }
      extra={<ProductAddToCart product={product} primary />}
    >
      <List
        size="small"
        dataSource={[
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
            value: getCategory(product.categoryId).name,
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
                        alt={product.name}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ),
          },
          {
            label: "Tags",
            value: getProductTags(product).map((tag, index) => (
              <Tag key={tag} color={shades[index]}>
                {tag}
              </Tag>
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

export default ProductDetail;
