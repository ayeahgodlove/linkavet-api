import { Button, Card, List } from "antd";
import React from "react";
import "./post.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
import { IPost } from "models/post";
import { Link } from "react-router-dom";
import slugify from "slugify";

const { Meta } = Card;
interface IProp {
  post: IPost;
  onPostClick: (postId: any) => void;
}
const PostCard: React.FC<IProp> = ({ post, onPostClick }) => {
  return (
    <List.Item
      key={post.id}
      className="post-list-item"
      style={{ padding: "4px 8px" }}
    >
      <Card
        bordered={false}
        style={{ padding: 0 }}
        bodyStyle={{ paddingTop: 10 }}
        cover={
          <img
            alt={post.title}
            src={`https://linkavet-api.onrender.com/uploads/posts/${post.imageUrl}`}
          />
        }
        className="post-card"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Meta
              title={
                <Link to={`/posts/${slugify(post.title, { lower: true })}`} onClick={()=> onPostClick(post.id)}>
                  {post.title}
                </Link>
              }
              description={
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(50, 400),
                  }}
                />
              }
            />
            <RaterComponent />
          </div>
        </div>
        <Button
          type="link"
          className="add-to-fav-btn"
          icon={<RiHeartFill size={30} className="add-to-fav" />}
        />
      </Card>
    </List.Item>
  );
};

export default PostCard;
