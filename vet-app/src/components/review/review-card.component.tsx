import { Card, Typography } from "antd";
import { IReview } from "models/review.model";
import React from "react";

interface Props {
  review: IReview;
}
const { Title, Paragraph } = Typography;
const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <>
      <Card
        bordered={false}
        style={{ padding: 0 }}
        bodyStyle={{ paddingTop: 10 }}
        className="review-card"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="./avatar" alt="customers avatar" />
          {review.description}

          <Title>{review.userId}</Title>
          <Paragraph>Honeyman Customer</Paragraph>
        </div>
      </Card>
    </>
  );
};

export default ReviewCard;
