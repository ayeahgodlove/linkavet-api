import { Col, List, Row } from "antd";
import React from "react";
import PostCard from "./post-card.component";
import { usePost } from "hooks/post.hook";
import { NoContent } from "components/shared/no-content/no-content.component";

interface Props {
  slice?: boolean;
}
const PostList: React.FC<Props> = ({ slice = false }) => {
  const { posts, setPost } = usePost();
  const handlePostClick = (postId: string) => {
    const post = posts.find((post) => post.id === postId);
    setPost(post!);
  };
  return (
    <Row justify={"center"} align={"top"}>
      <Col xs={22} md={22} lg={22}>
        {posts && posts.length > 0 ? (
          <List
            className="post-list"
            grid={{
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={slice ? posts.slice(0, 4) : posts}
            renderItem={(post) => {
              return (
                <PostCard
                  post={post}
                  key={post.id}
                  onPostClick={handlePostClick}
                />
              );
            }}
          />
        ) : (
          <Col span={24}>
            <NoContent title="No posts to display at the moment" />
          </Col>
        )}
      </Col>
    </Row>
  );
};

export default PostList;
