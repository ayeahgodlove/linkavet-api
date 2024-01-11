import { Avatar, Button, Card, Col, Image, List, Row, Typography } from "antd";
import CommentComponent from "components/comment/comment.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { SpinnerComponent } from "components/shared/spinner";
import { useCategory } from "hooks/category.hook";
import { useComment } from "hooks/comment.hook";
import { usePost } from "hooks/post.hook";
import { useUser } from "hooks/user.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersAsync } from "redux/user.slice";
import { format } from "utils/format";

const postDetailPage: React.FC = () => {
  const { post } = usePost();
  const { users, getUser } = useUser();
  const { categories } = useCategory();
  const { loadComments, comments, errors } = useComment();
  const dispatch = useDispatch();

  const [commentId, setCommentId] = useState("");
  const handleReplyComment = (parentId: string) => {
    setCommentId(parentId);
  };
  const inputRef = useRef<any>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const parentLists = comments.map((c) => {
    return {
      id: c.id,
      username: getUser(c.userId).firstname + " " + getUser(c.userId).lastname,
      email: getUser(c.userId).email,
      content: c.content,
      publishDate: c.publishedAt,
      parentComment: c.parent_id,
      replies: comments
        .filter((comment) => comment.parent_id === c.id)
        .map((t) => {
          return {
            id: t.id,
            username:
              getUser(t.userId).firstname + " " + getUser(t.userId).lastname,
            email: getUser(t.userId).email,
            content: t.content,
            publishDate: t.publishedAt,
            parentComment: t.parent_id,
          };
        }),
    };
  });

  // const childList= commn

  const load = useCallback(async () => {
    await loadComments(post.id);
  }, []);
  useEffect(() => {
    dispatch(fetchUsersAsync() as any);
    load();
  }, []);
  return (
    <GeneralAppShell>
      <Row align={"middle"} justify={"center"} style={{ marginTop: "2rem" }}>
        <Col span={23}>
          <PageBreadCrumbs items={["Pages", "Post", "Details"]} />
          <BackButton title="Post" />
        </Col>
        <Col lg={23}>
          <Card size="small">
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                alt={post.title}
                src={`https://linkavet-api.onrender.com/uploads/posts/${post.imageUrl}`}
                style={{
                  width: "100%",
                  maxHeight: "65vh",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              className="text"
              style={{ paddingLeft: "2rem", color: "#333" }}
            >
              <Typography.Title level={3} style={{ marginTop: 30 }}>
                {post.title}
              </Typography.Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
              <br />
              <p style={{ marginBottom: 0 }}>
                Category:{" "}
                {categories && categories.length
                  ? categories.find((u) => u.id === post.categoryId)?.name
                  : "Unclassified"}
              </p>
              <p style={{ marginBottom: 0 }}>
                Published By:{" "}
                {users && users.length
                  ? users.find((u) => u.id === post.authorId)?.username
                  : "John Doe"}
              </p>
              <p>Published On: {format.date(post.publishedAt)}</p>
            </div>

            <Row
              justify={"start"}
              style={{ paddingLeft: "2rem" }}
              className="comments"
            >
              <Col xs={23} md={18} lg={15}>
                {/* comment form */}
                <CommentComponent
                  parentId={commentId}
                  post={post}
                  inputRef={inputRef}
                />
                {errors.length > 0 ? (
                  <SpinnerComponent message={""} height={""} />
                ) : (
                  <List
                    className="demo-loadmore-list"
                    // loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={parentLists}
                    renderItem={(item: any) => (
                      <List.Item
                        actions={[
                          <Button
                            key="list-loadmore-edit"
                            type="link"
                            onClick={() => {
                              handleReplyComment(item.id);
                              focusInput();
                            }}
                          >
                            Reply
                          </Button>,
                        ]}
                        key={item.id}
                      >
                        <List.Item.Meta
                          avatar={<Avatar size="large">{item.username}</Avatar>}
                          title={<strong>{item.username}</strong>}
                          description={item.content}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default postDetailPage;
