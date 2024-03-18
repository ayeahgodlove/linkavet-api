// AppointmentForm.tsx

import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message, Select } from "antd";
import { Moment } from "moment";
import { useUserSpecialty } from "hooks/user-specialty.hook";

const AppointmentForm: React.FC = () => {
  const { userSpecialties } = useUserSpecialty();
  const handleSubmit = (values: any) => {
    console.log("values: ", values);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form layout="vertical" initialValues={{}} onFinish={handleSubmit}>
      <Form.Item
        label="Full Name"
        name={"name"}
        rules={[{ required: true, message: "Your Name is Required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name={"email"}
        rules={[{ required: true, message: "Your Email is Required!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name={"contactNo"}
        rules={[{ required: true, message: "Your Contact is Required!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Doctor's Name"
        name={"doctor"}
        rules={[
          {
            required: true,
            message: "Select a medical practitioner to consult",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select Runner Period"
          optionFilterProp="children"
          onChange={onSearch}
          onSearch={onSearch}
          filterOption={filterOption}
          options={userSpecialties.map((r) => {
            return {
              label: `${r.username}`,
              value: r.userId,
            };
          })}
        />
      </Form.Item>

      <Form.Item
        label="Appointment Date"
        name={"appointmentDate"}
        rules={[{ required: true, message: "Date is Required!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Appointment Time"
        name={"appointmentTime"}
        rules={[{ required: true, message: "Time is Required!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Symptoms"
        name={"symptoms"}
        rules={[{ required: true, message: "Enter identifiable symptoms!" }]}
      >
        <Input.TextArea rows={3} />
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
