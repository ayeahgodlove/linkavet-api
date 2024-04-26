import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useCallback, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useBanner } from "hooks/banner.hook";
import { useModalContext } from "context/app-modal.context";
import { useFormInit } from "hooks/shared/form-init.hook";
import { emptyBanner, IBanner } from "models/banner";
import { useUpload } from "hooks/shared/upload.hook";
import theme from "utils/themeConfig";
import { upload } from "utils/upload";
import UploadButton from "components/shared/upload-button.component";

type Props = {
  formMode: UpdateMode;
};

const BannerForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addBanner, editBanner, banner } = useBanner();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();
  const { fileList, handlePreview, onRemove, beforeUpload, progress } =
    useUpload();

  const onFinish = async (values: any) => {
    const formData: IBanner = {
      ...emptyBanner,
      ...values,
      userId: user.id
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addBanner(formData);
      if (feedback) {
        message.success("Banner created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }

    const formData2: IBanner = {
      ...banner,
      ...values,
      userId: user.id
    };
    if (formMode === UpdateMode.EDIT) {
      const feedback = await editBanner(formData2);
      if (feedback) {
        message.success("Banner updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };
  initFormData(
    form,
    formMode,
    formMode === UpdateMode.ADD ? emptyBanner : banner
  );
  const formData = new FormData();
  return (
    <ConfigProvider theme={theme}>
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
            formData.append("image", fileList[0] as any);
            const response = await upload("banners", formData);
            form.setFieldValue("image", response);
            return response;
          }, [form, fileList, formData])}
        >
          {fileList.length > 1 ? null : <UploadButton />}
        </Upload>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={emptyBanner}
      >
        <Form.Item
          name={"title"}
          label="Title"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"subTitle"}
          label="Description"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "Upload is required",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form>
    </ConfigProvider>
  );
};

export default BannerForm;
