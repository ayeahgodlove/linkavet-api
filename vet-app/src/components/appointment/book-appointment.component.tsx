// AppointmentForm.tsx

import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import { Moment } from "moment";

const AppointmentForm: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log("values: ", values);
  };

  return (
    <Form layout="vertical" initialValues={{}} onFinish={handleSubmit}>
      <Form.Item
        label="Name"
        name={"name"}
        rules={[{ required: true, message: "Your Name is Required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Appointment Date"
        name={"appointmentDate"}
        rules={[{ required: true, message: "Date is Required!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Book Appointment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AppointmentForm;
