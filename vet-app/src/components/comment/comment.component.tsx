import { Button, Form, Input, message } from "antd";
import { useComment } from "hooks/comment.hook";
import { CommentData } from "models/comment";
import { IPost } from "models/post";
import React, { useState } from "react";

const emptyCommentData: CommentData = {
  content: "",
  parent_id: "",
  postId: "",
};
const { TextArea } = Input;

type IProp = {
  post: IPost;
  parentId?: string | undefined;
  inputRef?: any;
};
const CommentComponent: React.FC<IProp> = ({ post, parentId, inputRef }) => {
  const { addComment } = useComment();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  console.log("Hello id: ", parentId);

  const onFinish = async (values) => {
    setLoading(true);
    const obj: CommentData = {
      content: values.content,
      postId: post.id,
      parent_id: parentId,
    };

    const feedback = await addComment(obj);
    if (feedback) {
      message.success("Comment posted successfully!");
    } else {
      message.error("Comment not posted, try again!");
    }
    setLoading(false);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={emptyCommentData}
    >
      <Form.Item name={"content"}>
        <TextArea
          rows={3}
          placeholder="Compose your comment here..."
          ref={inputRef}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading}>
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentComponent;
