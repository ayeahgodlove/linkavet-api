import { Button, Form, Input, Alert, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { useUserSpecialty } from "hooks/user-specialty.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IUserSpecialty } from "models/user-specialty.model";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "hooks/auth/auth.hook";
import { useUser } from "hooks/user.hook";

type Props = {
  formMode: UpdateMode;
  isTrue: boolean;
};
export const UserSpecialtyForm: React.FC<Props> = ({ formMode, isTrue }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { userSpecialty, editUserSpecialty, addUserSpecialty } =
    useUserSpecialty();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();
  const { user } = useAuth();
  const { users } = useUser();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values: IUserSpecialty) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IUserSpecialty = {
      ...userSpecialty,
      ...values,
      specialty: values.specialty,
      userId: user.id,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addUserSpecialty(obj);
      if (feedback) {
        message.success("UserSpecialty created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editUserSpecialty(obj);
      if (feedback) {
        message.success("UserSpecialty updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setSubmitted(true);
        setShow(true);
      }
    }
    setSubmitting(false);
  };

  useEffect(() => {
    initFormData(form, formMode, userSpecialty);
  }, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="userId"
          label="User"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Specialty is required",
            },
          ]}
        >
          <Select
            showSearch
            disabled={isTrue}
            placeholder="Select Runner Period"
            optionFilterProp="children"
            onChange={onSearch}
            onSearch={onSearch}
            filterOption={filterOption}
            options={users.map((r) => {
              return {
                label: r.username,
                value: r.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          name="twitter"
          label="Twitter"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Twitter is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="facebook"
          label="Facebook"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Facebook is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="linkedin"
          label="Linkedin"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Linkedin is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="specialty"
          label="Specialty"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Specialty is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          disabled={submitting}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
