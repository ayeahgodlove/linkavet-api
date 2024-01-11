import { Card, Col, List, Row, Typography } from "antd";
import { usePost } from "hooks/post.hook";
import React from "react";
import { format } from "utils/format";

const PostDetailComponent: React.FC = () => {
  const { post } = usePost();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: post.id,
          },
          {
            label: "Slug",
            value: post.slug,
          },
          {
            label: "Title",
            value: post.title,
          },
          {
            label: "Content",
            value: (
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            ),
          },
          {
            label: "Category",
            value: post.categoryId,
          },
          {
            label: "Author",
            value: post.authorId,
          },
          {
            label: "Published At",
            value: format.date(post.publishedAt),
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

export default PostDetailComponent;
