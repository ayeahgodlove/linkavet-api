import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import UploadButton from "components/shared/upload-button.component";
import UploadImage from "components/shared/upload-image";
import { useModalContext } from "context/app-modal.context";
import { useMail } from "hooks/mail.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useImage } from "hooks/shared/image.hook";
import { useUpload } from "hooks/shared/upload.hook";
import { useSubscriber } from "hooks/subscriber.hook";
import { IMail } from "models/mail.model";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";
import { upload } from "utils/upload";

type Props = {
  formMode: UpdateMode;
};
const MailingForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = Form.useForm();
  const { subscribers } = useSubscriber();
  const { setShow } = useModalContext();
  const { mail, addMail, editMail } = useMail();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = (url: string) => {
    const images = form.getFieldValue("media");
    form.setFieldsValue({
      images: [...images, url],
    });
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = async (values: any) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IMail = {
      ...mail,
      ...values,
      name: values.name,
      description: values.description,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addMail(obj);
      if (feedback) {
        message.success("Mail created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editMail(obj);
      if (feedback) {
        message.success("Mail updated successfully!");
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
    form.validateFields();
    initFormData(form, formMode, mail);
  }, [form]);

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <>
          <Form.Item
            name="media"
            label="Upload Attachments"
            style={{ marginTop: 13 }}
          >
            <UploadImage
              maxCount={4}
              folderName="mails"
              onUpload={handleImageUpload}
              name={"attactment"}
            />
          </Form.Item>
        </>
        <Form.Item name="email" label="Email" style={{ marginBottom: 3 }}>
          <Select
            size="large"
            showSearch
            placeholder="Select a user email"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            mode="multiple"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={subscribers.map((c) => {
              return {
                value: c.id,
                label: c.email,
              };
            })}
          />
        </Form.Item>

        <Form.Item name="headline" label="Headline" style={{ marginBottom: 3 }}>
          <Input size="large" />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="cta" label="cta" style={{ marginBottom: 3 }}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="type" label="Type" style={{ marginBottom: 3 }}>
              <Select
                size="large"
                showSearch
                placeholder="Select type"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { id: 1, description: "Marketing" },
                  { id: 2, description: "Promotion" },
                ].map((c) => {
                  return {
                    value: c.id,
                    label: c.description,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          style={{ marginBottom: 3 }}
        >
          <Input.TextArea size="large" rows={4} />
        </Form.Item>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ marginTop: 15 }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default MailingForm;
