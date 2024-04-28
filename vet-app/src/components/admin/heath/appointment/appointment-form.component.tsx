import { Button, ConfigProvider, Form, Input, Space, message } from "antd";
import React, { useEffect } from "react";
import { UpdateMode } from "../../../../models/shared/update-mode.enum";
import { useModalContext } from "../../../../context/app-modal.context";
import { useFormInit } from "../../../../hooks/shared/form-init.hook";
import theme from "../../../../utils/themeConfig";
import { useAppointment } from "../../../../hooks/health/appointment.hook";
import { IAppointment, emptyAppointment } from "../../../../models/health/appointment";

type Props = {
  formMode: UpdateMode;
};

const AppointmentForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { editAppointment, appointment } = useAppointment();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();

  const onFinish = async (values: any) => {
    const obj: IAppointment = {
      ...appointment,
      ...values,
    };

    console.log("obj: ", obj)

    const feedback = await editAppointment(obj);
    if (feedback) {
      message.success("Appointment Approved successfully!");
      setShow(false);
    } else {
      message.error("failed to approve");
      setShow(true);
    }
  };

  useEffect(() => {
    initFormData<IAppointment>(form, formMode, appointment, [
      "appointmentDate",
      "appointmentTime",
    ]);
  }, []);
  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={appointment}
      >
        <Form.Item
          name={"roomId"}
          label="Room ID"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input />
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
