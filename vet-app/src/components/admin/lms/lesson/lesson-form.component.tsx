import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Alert,
  message,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { modules } from "config/constant";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useCategory } from "hooks/category.hook";
import { useCourse } from "hooks/lms/course.hook";
import { useLesson } from "hooks/lms/lesson.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { ILesson } from "models/lms/lesson";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";

type Props = {
  formMode: UpdateMode;
};
export const LessonForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { lesson, editLesson, addLesson } = useLesson();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();
  const { user } = useAuth();
  const { categories } = useCategory();
  const { course } = useCourse();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onFinish = async (values: ILesson) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: ILesson = {
      ...lesson,
      ...values,
      authorId: user.id,
      courseId: course.id,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addLesson(obj);
      if (feedback) {
        message.success("Lesson created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editLesson(obj);
      if (feedback) {
        message.success("Lesson updated successfully!");
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
    initFormData(form, formMode, lesson);
  }, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[8, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="title"
              label="Title"
              requiredMark
              style={{ marginBottom: 3 }}
              rules={[
                {
                  required: true,
                  message: "Title is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={[8, 8]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="duration"
                  label="Duration"
                  rules={[
                    {
                      required: true,
                      message: "duration is required",
                    },
                  ]}
                >
                  <InputNumber name="duration" style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="difficulty"
                  label="Difficulty"
                  rules={[
                    {
                      required: true,
                      message: "Difficulty is required",
                    },
                  ]}
                >
                  <Input name="difficulty" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="description"
              label="Description"
              requiredMark
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={"content"}
          label="Content"
          rules={[
            {
              required: true,
              message: "Content is required",
            },
          ]}
        >
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={(html) => form.setFieldValue("content", html)}
            placeholder="Enter content..."
          />
        </Form.Item>

        <Row gutter={[8, 8]} style={{ marginBottom: 15 }}>
          <Col xs={24} md={8}>
            <Form.Item
              name="category"
              label="Category"
              style={{ marginBottom: 3 }}
            >
              <Select
                options={categories.map((c) => {
                  return {
                    value: c.id,
                    label: c.name,
                  };
                })}
                style={{ width: "100%" }}
                placeholder="Type to add category"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="language"
              label="Language"
              style={{ marginBottom: 3 }}
            >
              <Select
                options={[
                  { value: "01", label: "English" },
                  { value: "02", label: "French" },
                  { value: "03", label: "Spanish" },
                ]}
                style={{ width: "100%" }}
                placeholder="Type to add language"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="author" label="Author" style={{ marginBottom: 3 }}>
              <Input
                name="author"
                style={{ width: "100%" }}
                placeholder="Type to add author"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Form.List
            name="prerequisites"
            rules={[
              {
                validator: async (_, prerequisites) => {
                  if (!prerequisites || prerequisites.length < 1) {
                    return Promise.reject(
                      new Error("At least 1 prerequisites")
                    );
                  } else {
                    return Promise.resolve(); // Resolve the Promise when validation passes
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Col xs={24} md={8}>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Prerequisites" : ""}
                    required={false}
                    key={field.key}
                    style={{ marginBottom: 10 }}
                  >
                    <div style={{ display: "flex" }}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input answer or delete this field.",
                          },
                        ]}
                        style={{ width: "100%", marginBottom: 5 }}
                      >
                        <Input placeholder="prerequisite" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <div style={{ marginLeft: 5 }}>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{ fontSize: 20, opacity: 0.6 }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Form.Item>
                ))}
                <Form.Item style={{ marginBottom: 15 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add prerequisite
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Col>
            )}
          </Form.List>

          <Form.List
            name="objectives"
            rules={[
              {
                validator: async (_, objectives) => {
                  if (!objectives || objectives.length < 1) {
                    return Promise.reject(new Error("At least 1 objectives"));
                  } else {
                    return Promise.resolve(); // Resolve the Promise when validation passes
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Col xs={24} md={8}>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "objectives" : ""}
                    required={false}
                    key={field.key}
                    style={{ marginBottom: 10 }}
                  >
                    <div style={{ display: "flex" }}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input answer or delete this field.",
                          },
                        ]}
                        style={{ width: "100%", marginBottom: 5 }}
                      >
                        <Input placeholder="objectives" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <div style={{ marginLeft: 5 }}>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{ fontSize: 20, opacity: 0.6 }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Form.Item>
                ))}
                <Form.Item style={{ marginBottom: 15 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add objective
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Col>
            )}
          </Form.List>

          <Form.List
            name="keywords"
            rules={[
              {
                validator: async (_, keywords) => {
                  if (!keywords || keywords.length < 1) {
                    return Promise.reject(new Error("At least 1 keywords"));
                  } else {
                    return Promise.resolve(); // Resolve the Promise when validation passes
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Col xs={24} md={8}>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "keywords" : ""}
                    required={false}
                    key={field.key}
                    style={{ marginBottom: 10 }}
                  >
                    <div style={{ display: "flex" }}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input answer or delete this field.",
                          },
                        ]}
                        style={{ width: "100%", marginBottom: 5 }}
                      >
                        <Input placeholder="keywords" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <div style={{ marginLeft: 5 }}>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{ fontSize: 20, opacity: 0.6 }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Form.Item>
                ))}
                <Form.Item style={{ marginBottom: 15 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add keyword
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Col>
            )}
          </Form.List>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          disabled={submitting}
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
