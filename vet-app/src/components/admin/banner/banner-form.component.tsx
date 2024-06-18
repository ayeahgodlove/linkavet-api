import { Button, ConfigProvider, Form, Input, Space, message } from "antd";
import React from "react";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import { useBanner } from "../../../hooks/banner.hook";
import { useModalContext } from "../../../context/app-modal.context";
import { useFormInit } from "../../../hooks/shared/form-init.hook";
import { emptyBanner, IBanner } from "../../../models/banner";
import theme from "../../../utils/themeConfig";
import UploadImage from "components/shared/upload-image";

type Props = {
  formMode: UpdateMode;
};

const BannerForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addBanner, editBanner, banner } = useBanner();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();

  const handleImageUpload = (url: string) => {
    form.setFieldValue("image", url);
  };
  const onFinish = async (values: any) => {
    const formData: IBanner = {
      ...emptyBanner,
      ...values,
      userId: user.id,
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
      userId: user.id,
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
          <Input size="large" />
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
          <Input.TextArea size="large" />
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
          <UploadImage
            maxCount={1}
            folderName="banners"
            onUpload={handleImageUpload}
            name={"image"}
          />
        </Form.Item>
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form>
    </ConfigProvider>
  );
};

export default BannerForm;
