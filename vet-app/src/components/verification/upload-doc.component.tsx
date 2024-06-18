import { Button, Form, Input, message } from "antd";
import UploadImage from "components/shared/upload-image";
import { useAuth } from "hooks/auth/auth.hook";
import { useUserDoc } from "hooks/user-doc.hook";
import { emptyUserDoc, IUserDoc } from "models/user-doc.model";
import React, { useEffect, useState } from "react";

const UploadDocument: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const { addUserDoc } = useUserDoc();
  const { user } = useAuth();

  const handleImageUpload = (url: string) => {
    form.setFieldValue("photo", url);
  };

  const handleIdCardUpload = (url: string) => {
    form.setFieldValue("idCard", url);
  };

  const handleLiscenceUpload = (url: string) => {
    form.setFieldValue("license", url);
  };

  const handleDiplomaUpload = (url: string) => {
    form.setFieldValue("diploma", url);
  };

  const onFinish = async (values: any) => {
    setSubmitting(true);
    const obj: IUserDoc = {
      ...emptyUserDoc,
      ...values,
      userId: user.id,
    };
    const feedback = await addUserDoc(obj);
    if (feedback) {
      message.success("Documents Uploaded Successfully!");
    } else {
      message.error("Upload failed!");
    }
    setSubmitting(false);
  };

  useEffect(() => {}, [form]);

  return (
    <div>
      <Form
        initialValues={emptyUserDoc}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="photo"
          label="photo"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "Photo is required",
            },
          ]}
        >
          <UploadImage
            maxCount={1}
            folderName="user-docs"
            onUpload={handleImageUpload}
            name={"image"}
          />
        </Form.Item>

        <Form.Item
          name="idCard"
          label="IdCard"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "Id Card is required",
            },
          ]}
        >
          <UploadImage
            maxCount={1}
            folderName="user-docs"
            onUpload={handleIdCardUpload}
            name={"idCard"}
            extra={true}
            uri="id-card"
          />
        </Form.Item>

        <Form.Item
          name="license"
          label="license"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "License is required",
            },
          ]}
        >
          <UploadImage
            maxCount={1}
            folderName="user-docs"
            onUpload={handleLiscenceUpload}
            name={"license"}
            extra={true}
            uri="license"
          />
        </Form.Item>

        <Form.Item name="diploma" label="Diploma" style={{ marginBottom: 15 }}>
          <UploadImage
            maxCount={1}
            folderName="user-docs"
            onUpload={handleDiplomaUpload}
            name={"diploma"}
            extra={true}
            uri="diploma"
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
    </div>
  );
};

export default UploadDocument;
