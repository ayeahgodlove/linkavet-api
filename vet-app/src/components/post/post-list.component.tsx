import { Col, Row } from "antd";
import React from "react";
import PostCard from "./post-card.component";
import { usePost } from "../../hooks/post.hook";
// import { NoContent } from "components/shared/no-content/no-content.component";
import "./blog.less";

const PostList: React.FC = () => {
  const { posts, setPost } = usePost();
  const handlePostClick = (postId: string) => {
    const post = posts.find((post) => post.id === postId);
    setPost(post!);
  };
  return (
    <Row
      justify={"center"}
      align={"top"}
      style={{ marginTop: 30, marginBottom: 80 }}
    >
      {posts.map((post, index) => (
        <Col xs={18} md={8} lg={6} key={index + post.authorId}>
          <PostCard onPostClick={handlePostClick} post={post} />
        </Col>
      ))}
      {/* : (
      <Col span={24}>
        <NoContent title="No posts to display at the moment" />
      </Col>
      ) */}
    </Row>
  );
};

export default PostList;
