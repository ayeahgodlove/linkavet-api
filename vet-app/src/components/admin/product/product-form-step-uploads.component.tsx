import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import UploadButton from "components/shared/upload-button.component";
import { useUpload } from "hooks/shared/upload.hook";
import React, { useCallback, useEffect } from "react";
import { upload } from "utils/upload";

interface Props {
  form: FormInstance<any>;
  fileList: UploadFile<any>[];
  beforeUpload: (file: UploadFile<any>) => boolean;
  onRemove: (file: UploadFile<any>) => void;
}

const { Dragger } = Upload;
const ProductFormStepUploads: React.FC<Props> = ({
  form,
  fileList,
  beforeUpload,
  onRemove,
}) => {
  const { handlePreview, progress } = useUpload();
  const formData = new FormData();
  useEffect(() => {
    form.validateFields();
  }, [form]);

  return (
    <div style={{ padding: 10 }}>
      <>
        <Typography.Title level={5}>Upload Image</Typography.Title>
        <Dragger
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
            const response = await upload("products", formData);
            form.setFieldValue("imageUrl", response);
            return response;
          }, [form, fileList, formData])}
        >
          {fileList.length > 1 ? null : <UploadButton />}
        </Dragger>
      </>
    </div>
  );
};

export default ProductFormStepUploads;
