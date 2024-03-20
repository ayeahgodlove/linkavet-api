import { Card } from "antd";
import React from "react";
import "./post.less";
import RaterComponent from "components/shared/rate.component";
import { IPost } from "models/post";
import slugify from "slugify";
import { API_URL_UPLOADS_POSTS } from "config/constant";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { format } from "utils/format";
import "./post.less";
import { useUser } from "hooks/user.hook";

const { Meta } = Card;
interface IProp {
  post: IPost;
  onPostClick: (postId: any) => void;
}
const PostCard: React.FC<IProp> = ({ post, onPostClick }) => {
  const { getUser } = useUser();
  return (
    <a
      href={`/posts/${slugify(post.title, { lower: true })}`}
      onClick={() => onPostClick(post.id)}
    >
      <Card
        style={{ padding: 0, marginLeft: 15, borderRadius: 0 }}
        className="post"
        hoverable
        cover={
          <img
            alt={post.title}
            src={`${API_URL_UPLOADS_POSTS}/${post.imageUrl}`}
            style={{ borderRadius: 0 }}
          />
        }
        actions={[
          <div className="post__info">
            <div>
              <UserOutlined />
              <span>
                {" "}
                Posted by{" "}
                {getUser(post.authorId).firstname +
                  " " +
                  getUser(post.authorId).lastname}
              </span>
            </div>
            <div>
              <CalendarOutlined />
              <span> {format.date(post.publishedAt)}</span>
            </div>
          </div>,
        ]}
      >
        <Meta
          title={post.title}
          description={
            <div
              dangerouslySetInnerHTML={{
                __html: post.summary,
              }}
            />
          }
        />
        <time className="post__time-read">{"7"} Read</time>
        <RaterComponent />
      </Card>
    </a>
  );
};

export default PostCard;
