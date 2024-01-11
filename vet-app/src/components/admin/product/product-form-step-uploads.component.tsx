import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Upload, UploadFile } from "antd";
import React, { useEffect } from "react";

interface Props {
  form: FormInstance<any>;
  fileList: UploadFile<any>[];
  beforeUpload: (file: UploadFile<any>) => boolean;
  onRemove: (file: UploadFile<any>) => void;
  normFile: (e: any) => any;
}
const ProductFormStepUploads: React.FC<Props> = ({
  form,
  fileList,
  beforeUpload,
  onRemove,
  normFile,
}) => {
  useEffect(() => {
    form.validateFields();
  }, [form]);

  return (
    <div style={{ padding: 10 }}>
      <Form.Item
        name="productImages"
        label="Upload Product Images"
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
          name="productImages"
          fileList={fileList}
          type="drag"
          style={{
            padding: "1rem",
          }}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default ProductFormStepUploads;
