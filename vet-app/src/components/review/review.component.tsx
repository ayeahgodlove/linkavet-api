import { Col, Row, Typography } from "antd";
import { useReview } from "hooks/review.hook";
import React from "react";
import ReviewList from "./review-list.component";

const { Title, Paragraph } = Typography;
const Review = () => {
  const { reviews } = useReview();
  return (
    <>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ marginTop: 40 }}
        gutter={[4, 4]}
      >
        <Col xs={24} md={24} lg={24}>
          <Title
            style={{
              textAlign: "center",
              lineHeight: 1.5,
              fontSize: 40,
              marginBottom: 0,
            }}
          >
            Customer Reviews
          </Title>
          <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
            <p>
              Thousands of our customers are raving about us, and this is what
              they have to say.
            </p>
          </Paragraph>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <ReviewList slice={true} />
        </Col>
      </Row>
    </>
  );
};

export default Review;
