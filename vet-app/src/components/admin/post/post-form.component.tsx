import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "../../../components/shared/form-error/form-error.component";
import { modules } from "../../../config/constant";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { useCategory } from "../../../hooks/category.hook";
import { usePost } from "../../../hooks/post.hook";
import { useFormInit } from "../../../hooks/shared/form-init.hook";
import { useTag } from "../../../hooks/tag.hook";
import { emptyPost, IPost } from "../../../models/post";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadImage from "components/shared/upload-image";

type Props = {
  formMode: UpdateMode;
};
export const PostForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { post, editPost, addPost } = usePost();
  const { categories } = useCategory();
  const { tags } = useTag();
  const { setShow } = useModalContext();
  const { user } = useAuth();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const handleImageUpload = (url: string) => {
    form.setFieldValue("imageUrl", url);
  };

  const onFinish = async (values: IPost) => {
    setSubmitting(true);
    setSubmitted(false);

    const obj: IPost = {
      ...emptyPost,
      ...values,
      authorId: user.id,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addPost(obj);
      if (feedback) {
        message.success("Post created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    const obj2: IPost = {
      ...post,
      ...values,
    };
    if (formMode === UpdateMode.EDIT) {
      const feedback = await editPost(obj2);
      if (feedback) {
        message.success("Post updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setSubmitted(true);
        setShow(true);
      }
    }
    setSubmitting(false);
  };
  initFormData(form, formMode, formMode === UpdateMode.ADD ? emptyPost : post);
  useEffect(() => {}, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />
      <Form
        initialValues={formMode === UpdateMode.ADD ? emptyPost : post}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row align={"middle"} justify={"space-between"} gutter={[8, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="categoryId"
              label="Category"
              style={{ marginBottom: 3 }}
              rules={[
                {
                  required: true,
                  message: "Category is required",
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categories.map((c) => {
                  return {
                    value: c.id,
                    label: c.name,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="tags"
              label="Select Tags"
              style={{ marginBottom: 3 }}
              rules={[
                {
                  required: true,
                  message: "Tags is required",
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                mode="multiple"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={tags.map((c) => {
                  return {
                    value: c.id,
                    label: c.name,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="title"
          label="Title"
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Summary"
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Summary is required",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name={"content"}
          label="Content"
          rules={[
            {
              required: true,
              message: "Content is required",
            },
          ]}
        >
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={(html) => form.setFieldValue("content", html)}
            placeholder="Enter content..."
          />
        </Form.Item>

        <Form.Item
          name={"imageUrl"}
          label="Image"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <UploadImage
            maxCount={4}
            folderName="posts"
            onUpload={handleImageUpload}
            name="imageUrl"
          />
        </Form.Item>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={submitting}
          disabled={submitting}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
