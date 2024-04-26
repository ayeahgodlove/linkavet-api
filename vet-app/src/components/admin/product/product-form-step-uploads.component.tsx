import {
  Form,
  FormInstance,
  Input,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import UploadButton from "components/shared/upload-button.component";
import { useImage } from "hooks/shared/image.hook";
import { useUpload } from "hooks/shared/upload.hook";
import React, { useCallback, useEffect, useState } from "react";
import { upload } from "utils/upload";

interface Props {
  form: FormInstance<any>;
  fileList: UploadFile<any>[];
  beforeUpload: (file: UploadFile<any>) => boolean;
  onRemove: (file: UploadFile<any>) => void;
}

const ProductFormStepUploads: React.FC<Props> = ({
  form,
  fileList,
  beforeUpload,
  onRemove,
}) => {
  const { handlePreview, progress } = useUpload();
  const { addImage, images } = useImage();

  const formData = new FormData();
  useEffect(() => {
    form.validateFields();
    form.setFieldValue("productImages", images);
  }, [form, images]);


  return (
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
            const response = await upload("products", formData);
            addImage(response);
            return response;
          }, [form, fileList, images, formData])}
        >
          {fileList.length > 4 ? null : <UploadButton />}
        </Upload>
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
          <Input multiple={true} disabled />
        </Form.Item>
      </>
    </div>
  );
};

export default ProductFormStepUploads;
