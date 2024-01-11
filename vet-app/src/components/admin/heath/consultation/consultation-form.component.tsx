import { Button, ConfigProvider, Form, Input, Space, message } from "antd";
import React, { useEffect } from "react";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useModalContext } from "context/app-modal.context";
import { useFormInit } from "hooks/shared/form-init.hook";
import theme from "utils/themeConfig";
import { useConsultation } from "hooks/health/consultation.hook";
import { IConsultation, emptyConsultation } from "models/health/consultation";

type Props = {
  formMode: UpdateMode;
};

const ConsultationForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addConsultation, editConsultation, consultation } = useConsultation();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();

  const onFinish = async (values: any) => {
    const obj: IConsultation = {
      ...values,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addConsultation(obj);
      if (feedback) {
        message.success("Consultation created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editConsultation(obj);
      if (feedback) {
        message.success("Consultation updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };

  useEffect(() => {
    initFormData(form, formMode, consultation);
  }, []);
  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={emptyConsultation}
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
          name={"description"}
          label="Description"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input.TextArea rows={3} />
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

export default ConsultationForm;
