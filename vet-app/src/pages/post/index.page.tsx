import { Col, Divider, Row, Typography } from "antd";
import PostList from "components/post/post-list.component";
import PageBannerComponent from "components/shared/page-banner/page-banner.component";
import { useAuth } from "hooks/auth/auth.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPostsAsync } from "redux/post.slice";

const PostPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAsync() as any);
  }, [isLoading]);
  return (
    <GeneralAppShell>
      {/* Dummy banner */}
      <PageBannerComponent
        title="Informed Pet Parenting: Read Our Latest Veterinary Insights and Tips"
        description="Stay informed and connected with the latest trends, insights, and valuable tips in pet care. Our blog at Linkavet is a trusted resource for pet parents, filled with expert advice from our experienced veterinary team. Explore a variety of topics, from health and nutrition to behavior and training. Empower yourself with knowledge and become a proactive and knowledgeable pet owner. For the love of your furry friends, Linkavet is your go-to destination for insightful pet-related content"
        linkCmd="Browse Articles"
      />
      {/* post list */}
      <Row style={{ marginTop: 50, padding: "0 3rem" }}>
        <Col span={24}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", opacity: 0.8 }}
          >
            Blog Posts Listings
          </Typography.Title>
          <Divider />
        </Col>
      </Row>
      <PostList />
    </GeneralAppShell>
  );
};

export default PostPage;
