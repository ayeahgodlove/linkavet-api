import { Card, Col, Image, List, Row, Tag, Typography } from "antd";
import { API_URL_UPLOADS_POSTS } from "../../../config/constant";
import { usePost } from "../../../hooks/post.hook";
import React from "react";
import { format } from "../../../utils/format";

const PostDetailComponent: React.FC = () => {
  const { post, getPostTags } = usePost();
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
            label: "Image",
            value: (
              <Image
                src={`${API_URL_UPLOADS_POSTS}/${post.imageUrl}`}
                style={{ width: "100%", objectFit: "cover", height: "400px" }}
                // crossOrigin="anonymous"
              />
            ),
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
            label: "Tags",
            value: getPostTags(post).map((tag) => <Tag key={tag}>{tag}</Tag>),
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
