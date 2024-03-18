import { Col, Divider, Row, Typography } from "antd";
import PostList from "components/post/post-list.component";
import PageBannerComponent from "components/shared/page-banner/page-banner.component";
import { useAuth } from "hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { fetchPostsAsync } from "redux/post.slice";

const PostPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAsync() as any);
  }, [isLoading]);
  return (
    <>
      <Helmet>
        <title>
          Explore Premium Vet Products - Your Pet's Wellbeing, Our Priority
        </title>
        <meta
          name="description"
          content="Browse through a carefully curated collection of vet-approved products at Linkavet. Elevate your pet's lifestyle with our premium range of nutrition, grooming essentials, toys, and wellness products. Each item is selected with your pet's health and happiness in mind. Shop confidently for top-quality products that complement our commitment to excellence in veterinary care. Enhance your pet's life today with Linkavet."
        />
      </Helmet>
      {/* Dummy banner */}
      <PageBannerComponent
        title="Read Our Latest Veterinary Insights and Tips"
        description="Stay informed and connected with the latest trends, insights, and valuable tips in pet care. Our blog at Linkavet is a trusted resource for pet parents, filled with expert advice from our experienced veterinary team."
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
    </>
  );
};

export default PostPage;
