import { Button, Form, Input, Alert, message, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { useUserRole } from "hooks/user-role.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IUserRole } from "models/user-role.model";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "hooks/user.hook";
import { useRole } from "hooks/role.hook";

type Props = {
  formMode: UpdateMode;
};
export const UserRoleForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { userRole, editUserRole, addUserRole, userRoles } = useUserRole();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();
  const { users } = useUser();
  const { roles } = useRole();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const getCurrentUserRole = useCallback(() => {
   const userRole = userRoles.find(ur => ur.userId === currentUser )
  }, [])

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onChange = (value: string) => {
    setCurrentUser(value)
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = async (values: IUserRole) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IUserRole = {
      ...userRole,
      ...values,
    };

    console.log("obj: ", obj)

    if (formMode === UpdateMode.ADD) {
      const feedback = await addUserRole(obj);
      if (feedback) {
        message.success("UserRole created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editUserRole(obj);
      if (feedback) {
        message.success("UserRole updated successfully!");
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
    initFormData(form, formMode, userRole);
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
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "User is required",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a User"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={users.map((c) => {
              return {
                value: c.id,
                label: c.username,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Role"
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Role is required",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a Role"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={roles.map((c) => {
              return {
                value: c.id,
                label: c.name,
              };
            })}
          />
        </Form.Item>

        <Space style={{ marginTop: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            disabled={submitting}
          >
            Submit
          </Button>

          <Button type="default" htmlType="reset">
            Reset
          </Button>
        </Space>
      </Form>
    </>
  );
};
