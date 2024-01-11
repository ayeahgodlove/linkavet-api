import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Space,
  Upload,
  message,
} from "antd";
import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useBanner } from "hooks/banner.hook";
import { useModalContext } from "context/app-modal.context";
import { useFormInit } from "hooks/shared/form-init.hook";
import { emptyBanner } from "models/banner";
import { useUpload } from "hooks/shared/upload.hook";
import theme from "utils/themeConfig";

type Props = {
  formMode: UpdateMode;
};

const BannerForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addBanner, editBanner, banner } = useBanner();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();
  const { fileList, onChangeUpload, onRemove, beforeUpload, progress } =
    useUpload();

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subTitle", values.subTitle);
    formData.append("userId", user.id);

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      formData.append("image", file);
    });

    if (formMode === UpdateMode.ADD) {
      const feedback = await addBanner(formData as any);
      if (feedback) {
        message.success("Banner created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editBanner(formData as any);
      if (feedback) {
        message.success("Banner updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };
  useEffect(() => {
    initFormData(form, formMode, banner);
  }, []);
  return (
    <ConfigProvider theme={theme}>
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
          <Upload
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={onChangeUpload}
            onRemove={onRemove}
            progress={progress}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
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
