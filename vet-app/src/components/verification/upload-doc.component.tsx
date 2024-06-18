import { UploadOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Upload } from "antd";
import { useImage } from "hooks/shared/image.hook";
import { useUpload } from "hooks/shared/upload.hook";
import { emptyUserDoc } from "models/user-doc.model";
import React, { useEffect, useState } from "react";

const UploadDocument: React.FC = () => {
  const { fileList, uploadProps } = useUpload();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const { images } = useImage();
  const onFinish = (values) => {
    setSubmitting(true);
    console.log(values);

    setSubmitting(false);
  };

  useEffect(() => {
    form.validateFields();
    form.setFieldValue("documents", images);
  }, [form, images]);

  return (
    <div>
      <Upload {...uploadProps("document")} name="document">
        {fileList.length  > 3 ? null : (
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        )}
      </Upload>
      <Divider />

      <Form
        initialValues={emptyUserDoc}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="documents"
          label="Documents"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "Documents is required",
            },
          ]}
        >
          <>
            <Input hidden={true} multiple />
          </>
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
