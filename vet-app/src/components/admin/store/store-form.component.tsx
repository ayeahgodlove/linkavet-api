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
import { useAuth } from "../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import { useStore } from "../../../hooks/store.hook";
import { useModalContext } from "../../../context/app-modal.context";
import { useFormInit } from "../../../hooks/shared/form-init.hook";
import { IStore, emptyStore } from "../../../models/store";
import { useUpload } from "../../../hooks/shared/upload.hook";
import theme from "../../../utils/themeConfig";
import { upload } from "../../../utils/upload";
import UploadButton from "../../../components/shared/upload-button.component";
import UploadImage from "components/shared/upload-image";

type Props = {
  formMode: UpdateMode;
};

const StoreForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addStore, editStore, store } = useStore();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();

  const handleImageUpload = (url: string) => {
    form.setFieldValue("imageBannerUrl", url);
  };

  const onFinish = async (values: IStore) => {
    const formData: IStore = {
      ...emptyStore,
      ...values,
      userId: user.id,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addStore(formData);
      if (feedback) {
        message.success("Store created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }

    const formData2: IStore = {
      ...store,
      id: store.id,
    };
    if (formMode === UpdateMode.EDIT) {
      const feedback = await editStore(formData2);
      if (feedback) {
        message.success("Store updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };

  useEffect(() => {}, []);
  initFormData(
    form,
    formMode,
    formMode === UpdateMode.ADD ? emptyStore : store
  );
  const formData = new FormData();
  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={emptyStore}
      >
        <Form.Item
          name={"name"}
          label="Name"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name={"location"}
          label="Adress"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="imageBannerUrl"
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
            folderName="stores"
            onUpload={handleImageUpload}
            name={"imageBannerUrl"}
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

export default StoreForm;
