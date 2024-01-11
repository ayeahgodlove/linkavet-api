import { Card, Col, List, Row, Typography } from "antd";
import { useDocument } from "hooks/document.hook";
import React from "react";
import { format } from "utils/format";

const DocumentDetailComponent: React.FC = () => {
  const { document } = useDocument();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: document.id,
          },
          {
            label: "Slug",
            value: document.slug,
          },
          {
            label: "Title",
            value: document.title,
          },
          {
            label: "Description",
            value: document.description,
          },
          {
            label: "Category",
            value: document.categoryId,
          },
          {
            label: "User",
            value: document.userId,
          },
          {
            label: "Uploaded At",
            value: format.date(document.uploadDate),
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

export default DocumentDetailComponent;
