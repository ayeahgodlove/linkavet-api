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

  const { handlePreview, progress, fileList, beforeUpload, onRemove } =
    useUpload();
  const { addImage, images } = useImage();

  const formData = new FormData();
  useEffect(() => {
    form.validateFields();
    form.setFieldValue("media", images);
    initFormData(form, formMode, mail);
  }, [form, images]);

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div style={{ padding: 10 }}>
          <>
            <Typography.Title level={5}>Upload Image</Typography.Title>
            <Upload
              name="image"
              listType="picture-card"
              beforeUpload={beforeUpload}
              onRemove={onRemove}
              progress={progress}
              fileList={fileList}
              onPreview={handlePreview}
              action={useCallback(async () => {
                formData.append("imageUrl", fileList[0] as any);
                const response = await upload("mails", formData);
                addImage(response);
                return response;
              }, [form, fileList, images, formData])}
            >
              {fileList.length > 4 ? null : <UploadButton />}
            </Upload>
            <Form.Item
              name="media"
              style={{ marginTop: 13, display: "none" }}
              // rules={[
              //   {
              //     required: true,
              //     message: "media are required",
              //   },
              // ]}
              // style={{ display: "none" }}
            >
              <Input multiple={true} disabled />
            </Form.Item>
          </>
        </div>

        <Form.Item
          name="email"
          label="Email"
          style={{ marginBottom: 3 }}
          // rules={[
          //   {
          //     required: true,
          //     message: "Email is required",
          //   },
          // ]}
        >
          <Select
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

        <Form.Item
          name="headline"
          label="Headline"
          style={{ marginBottom: 3 }}
          // rules={[
          //   {
          //     required: true,
          //     message: "Headline is required",
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="cta"
              label="cta"
              style={{ marginBottom: 3 }}
              // rules={[
              //   {
              //     required: true,
              //     message: "cta is required",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="type"
              label="Type"
              style={{ marginBottom: 3 }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Type is required",
              //   },
              // ]}
            >
              <Select
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
          // rules={[
          //   {
          //     required: true,
          //     message: "Description is required",
          //   },
          // ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default MailingForm;
