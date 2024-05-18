import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import UploadButton from "components/shared/upload-button.component";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useImage } from "hooks/shared/image.hook";
import { useUpload } from "hooks/shared/upload.hook";
import { useSubscriber } from "hooks/subscriber.hook";
import React, { useCallback, useEffect } from "react";
import { upload } from "utils/upload";

const MailingForm = () => {
  const { initFormData } = useFormInit();
  const [form] = Form.useForm();
  const { subscribers } = useSubscriber();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const { handlePreview, progress, fileList, beforeUpload, onRemove } =
    useUpload();
  const { addImage, images } = useImage();

  const formData = new FormData();
  useEffect(() => {
    form.validateFields();
    form.setFieldValue("media", images);
  }, [form, images]);

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div style={{ padding: 10 }}>
          <>
            <Typography.Title level={5}>Upload Image</Typography.Title>
            <Upload
              name="image"
              listType="picture-card"
              beforeUpload={beforeUpload}
              onRemove={onRemove}
              progress={progress}
              fileList={fileList}
              onPreview={handlePreview}
              action={useCallback(async () => {
                formData.append("imageUrl", fileList[0] as any);
                const response = await upload("mails", formData);
                addImage(response);
                return response;
              }, [form, fileList, images, formData])}
            >
              {fileList.length > 4 ? null : <UploadButton />}
            </Upload>
            <Form.Item
              name="media"
              style={{ marginTop: 13 }}
              rules={[
                {
                  required: true,
                  message: "media are required",
                },
              ]}
            >
              <Input multiple={true} disabled />
            </Form.Item>
          </>
        </div>

        <Form.Item
          name="email"
          label="Email"
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Email is required",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a user email"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            mode="multiple"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={subscribers.map((c) => {
              return {
                value: c.id,
                label: c.email,
              };
            })}
          />
        </Form.Item>

        <Form.Item
          name="headline"
          label="Headline"
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Headline is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="cta"
              label="cta"
              style={{ marginBottom: 3 }}
              rules={[
                {
                  required: true,
                  message: "cta is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="type"
              label="Type"
              style={{ marginBottom: 3 }}
              rules={[
                {
                  required: true,
                  message: "Type is required",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select type"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { id: 1, description: "Marketing" },
                  { id: 2, description: "Promotion" },
                ].map((c) => {
                  return {
                    value: c.id,
                    label: c.description,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="ctaDescription"
          label="CtaDescription"
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "CtaDescription is required",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default MailingForm;
