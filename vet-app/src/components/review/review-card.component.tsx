import { Avatar, Card, Rate } from "antd";
import { API_URL_UPLOADS_AVATARS } from "config/constant";
import { useUser } from "hooks/user.hook";
import { IReview } from "models/review.model";
import React from "react";

interface Props {
  review: IReview;
}
const { Meta } = Card;

const ReviewCard: React.FC<Props> = ({ review }) => {
  const { getUser } = useUser();
  const user = getUser(review.userId);
  return (
    <>
      <Card style={{ marginBottom: 20, marginLeft: 10 }}>
        <Meta
          avatar={<Avatar src={`${API_URL_UPLOADS_AVATARS}/${user.avatar}`} size={50} />}
          title={user.firstname + " " + user.lastname}
          description={
            <>
              <Rate disabled defaultValue={review.rating} />
              <p style={{ marginTop: 8 }}>{review.comment}</p>
            </>
          }
        />
      </Card>
    </>
  );
};

export default ReviewCard;
