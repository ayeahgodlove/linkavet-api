import { Card, Col, List, Row, Typography } from "antd";
import { useCategory } from "../../../hooks/category.hook";
import React from "react";

const CategoryDetailComponent: React.FC = () => {
  const { category } = useCategory();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: category.id,
          },
          {
            label: "Name",
            value: category.name,
          },
          {
            label: "Slug",
            value: category.slug,
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

export default CategoryDetailComponent;
