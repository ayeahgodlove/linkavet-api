import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { usePost } from "hooks/post.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useModalContext } from "context/app-modal.context";
import { useDispatch } from "react-redux";
import { PostForm } from "./post-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import search from "utils/search";
import { fetchpostSuccess } from "redux/post.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { IPost } from "models/post";
import { usePostColumn } from "./post-column.component";

const { Search } = Input;

const PostTable: React.FC = () => {
  const { posts, setPost, initialFetch } = usePost();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const router = useNavigate();
  const { postTableColumns } = usePostColumn()

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createPost = () => {
    setTitle("Create a Post");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <PostForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getPosts = useCallback(async (): Promise<IPost[]> => {
    setLoading(true);
    const response = await fetch(`/api/posts`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultPosts: IPost[] = posts.filter((client) =>
    search(client, ["title"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (post: IPost) => {
    setPost(post);
    router(`/admin/posts/${post.slug}`);
  };

  useEffect(() => {
    (async () => {
      const postDATas = await getPosts();
      dispatch(fetchpostSuccess([...postDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Posts loading..." height="65vh" />;
  }

  return (
    <>
      {posts && posts.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(banner) => onChange(banner)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IPost>
            dataSource={
              resultPosts && resultPosts.length > 0
                ? resultPosts
                : posts
            }
            columns={postTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IPost) => {
              return {
                onClick: (e) => {
                  console.log(e);
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <NoContent
          title="No data for post"
          showButton={true}
          buttonLabel="Add Post"
          handleClick={createPost}
        />
      )}
    </>
  );
};

export default PostTable;
