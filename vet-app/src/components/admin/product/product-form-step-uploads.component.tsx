import {
  Form,
  FormInstance,
  Typography,
} from "antd";
import UploadImage from "components/shared/upload-image";
import React, { useEffect } from "react";

interface Props {
  form: FormInstance<any>;
}

const ProductFormStepUploads: React.FC<Props> = ({
  form,
}) => {

  const handleImageUpload = (url: string) => {
    const images = form.getFieldValue("productImages");
    form.setFieldsValue({
      images: [...images, url],
    });
  };

  useEffect(() => {
    form.validateFields();
  }, [form]);

  return (
    <div style={{ padding: 10 }}>
      <>
        <Typography.Title level={5}>Upload Image</Typography.Title>

        <Form.Item
          name="productImages"
          style={{ marginTop: 13 }}
          rules={[
            {
              required: true,
              message: "Images are required",
            },
          ]}
        >
          <UploadImage
            maxCount={4}
            folderName="products"
            onUpload={handleImageUpload}
            name="imageUrl"
          />
        </Form.Item>
      </>
    </div>
  );
};

export default ProductFormStepUploads;
