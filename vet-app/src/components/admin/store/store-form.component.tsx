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

type Props = {
  formMode: UpdateMode;
};

const StoreForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addStore, editStore, store } = useStore();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();
  const { fileList, handlePreview, onRemove, beforeUpload, progress } =
    useUpload();

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
      ...formData,
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
            formData.append("imageBannerUrl", fileList[0] as any);
            const response = await upload("stores", formData);
            form.setFieldValue("imageBannerUrl", response);
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
          <Input />
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
          <Input />
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

export default StoreForm;
