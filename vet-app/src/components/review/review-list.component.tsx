import { List } from "antd";
import React from "react";
import ReviewCard from "./review-card.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useReview } from "hooks/review.hook";

interface Props {
  slice?: boolean;
}
const ReviewList: React.FC<Props> = ({ slice = false }) => {
  const {reviews} = useReview()
  return (
    <List
      className="review-list"
      grid={{
        gutter: 0,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
      dataSource={slice ? reviews.slice(0, 4) : reviews}
      renderItem={(review) => (
        <Link
          key={review.id}
          to={`/reviews/${slugify(review.id, { lower: true })}`}
        >
          <ReviewCard review={review} />
        </Link>
      )}
    />
  );
};

export default ReviewList;
