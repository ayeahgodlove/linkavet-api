import { Rate, Avatar } from "antd";
import { API_URL_UPLOADS_AVATARS } from "config/constant";
import { useUser } from "hooks/user.hook";
import { IReview } from "models/review.model";
import React from "react";

interface Props {
  review: IReview;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  const { getUser } = useUser();
  const user = getUser(review.userId);
  return (
    <>
      <div key={review.id} className="carousel__item">
        <Avatar src={`${API_URL_UPLOADS_AVATARS}/${user.avatar}`} size={150} >{user.username}</Avatar>
        <p className="carousel__item-comment">{review.comment}</p>
        <p className="carousel__item-commenter">
          <span className="commenter__name">
            {user.firstname + " " + user.lastname}{" "}
          </span>
        </p>
        <Rate disabled defaultValue={review.rating} />
      </div>
    </>
  );
};

export default ReviewCard;
