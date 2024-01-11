import { Button, ConfigProvider, Form, Input, Space, message } from "antd";
import React, { useEffect } from "react";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useModalContext } from "context/app-modal.context";
import { useFormInit } from "hooks/shared/form-init.hook";
import theme from "utils/themeConfig";
import { useAppointment } from "hooks/health/appointment.hook";
import { IAppointment, emptyAppointment } from "models/health/appointment";

type Props = {
  formMode: UpdateMode;
};

const AppointmentForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addAppointment, editAppointment, appointment } = useAppointment();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();

  const onFinish = async (values: any) => {
    const obj: IAppointment = {
      ...values,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addAppointment(obj);
      if (feedback) {
        message.success("Appointment created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editAppointment(obj);
      if (feedback) {
        message.success("Appointment updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };

  useEffect(() => {
    initFormData(form, formMode, appointment);
  }, []);
  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={emptyAppointment}
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

export default AppointmentForm;
