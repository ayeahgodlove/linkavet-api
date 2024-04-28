import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "../../../components/shared/form-error/form-error.component";
import UploadButton from "../../../components/shared/upload-button.component";
import { modules } from "../../../config/constant";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { useCategory } from "../../../hooks/category.hook";
import { usePost } from "../../../hooks/post.hook";
import { useFormErrors } from "../../../hooks/shared/form-error.hook";
import { useFormInit } from "../../../hooks/shared/form-init.hook";
import { useUpload } from "../../../hooks/shared/upload.hook";
import { useTag } from "../../../hooks/tag.hook";
import { emptyPost, IPost } from "../../../models/post";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { upload } from "../../../utils/upload";

type Props = {
  formMode: UpdateMode;
};
export const PostForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { post, editPost, addPost } = usePost();
  const { categories } = useCategory();
  const { tags } = useTag();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();
  const { user } = useAuth();
  // const { beforeUpload, onRemove, normFile, fileList, progress } = useUpload();
  const { fileList, handlePreview, onRemove, beforeUpload, progress } =
    useUpload();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
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
  const formData = new FormData();
  useEffect(() => {}, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <div style={{ marginBottom: 15 }}>
        <Typography.Title level={5}>Upload Image</Typography.Title>
        <Upload
          name="image"
          maxCount={1}
          listType="picture-card"
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          progress={progress}
          fileList={fileList}
          onPreview={handlePreview}
          action={useCallback(async () => {
            formData.append("imageUrl", fileList[0] as any);
            const response = await upload("posts", formData);
            form.setFieldValue("imageUrl", response);
            return response;
          }, [form, fileList, formData])}
        >
          {fileList.length > 1 ? null : <UploadButton />}
        </Upload>
      </div>
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
                showSearch
                placeholder="Select a person"
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
          <Input />
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
          <Input />
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
          <Input disabled={true} />
        </Form.Item>

        <Button
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
