import React from "react";
import { Button, Row, Col, Typography } from "antd";
import useWindowSize from "../../hooks/shared/window-resize.hook";
import {useNavigate } from "react-router-dom";
import PostList from "./post-list.component";

const BlogPost = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  return (
    <>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ padding: `${width > 768 ? "0 5rem" : ".3rem"}` }}
      >
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col xs={22} md={18} lg={18} xl={14} style={{ margin: `${width > 768 ? "5rem 0" : "2rem 0"}` }}>
            <Typography.Title
              style={{
                textAlign: "center",
                fontSize: 40,
                marginBottom: 0,
              }}
            >
              <span className="gradient-title gradient-title-font">Pet Connection</span>
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 17, textAlign: "center" }}>
              <p>
                Explore our curated collection of pet telehealth & news,
                articles and blog posts. <br />
                <Button
                  type="link"
                  style={{ color: "#5a008b", fontWeight: "bold" }}
                  onClick={() => navigate("/posts")}
                >
                  More pet resources →
                </Button>
              </p>
            </Typography.Paragraph>
          </Col>
        </Col>
      </Row>
      <PostList />
    </>
  );
};

export default BlogPost;
