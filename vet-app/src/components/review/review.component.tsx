import { Col, Row, Typography } from "antd";
import { useReview } from "hooks/review.hook";
import React from "react";
import ReviewCard from "./review-card.component";

const { Title, Paragraph } = Typography;
const Review = () => {
  const { reviews } = useReview();
  return (
    <>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ margin: "40px 0" }}
        gutter={[16, 16]}
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
        <Col xs={22} md={20}>
          <Row justify={"center"} align={"middle"}>
            {reviews.slice(0,3).map((r) => (
              <Col xs={22} md={8} key={r.id}>
                <ReviewCard review={r} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Review;
