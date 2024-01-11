import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { modules } from "config/constant";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useCategory } from "hooks/category.hook";
import { usePost } from "hooks/post.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useUpload } from "hooks/shared/upload.hook";
import { useTag } from "hooks/tag.hook";
import { IPost, PostFormData } from "models/post";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const { beforeUpload, onRemove, normFile, fileList, progress } = useUpload();

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

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("authorId", user.id);
    formData.append("categoryId", values.categoryId);
    values.tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      formData.append("imageUrl", file);
    });

    if (formMode === UpdateMode.ADD) {
      const feedback = await addPost(formData);
      if (feedback) {
        message.success("Post created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    const formData2: PostFormData = {
      ...formData,
      id: post.id,
    };
    if (formMode === UpdateMode.EDIT) {
      const feedback = await editPost(formData2);
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

  useEffect(() => {
    initFormData(form, formMode, post);
  }, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row align={"middle"} justify={"space-between"} gutter={[8, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="categoryId"
              label="Category"
              requiredMark
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
              requiredMark
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
          requiredMark
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
          name="imageUrl"
          label="Upload"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Upload is required",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={beforeUpload}
            onRemove={onRemove}
            maxCount={1}
            name="imageUrl"
            progress={progress}
            fileList={fileList}
            type="drag"
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
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
