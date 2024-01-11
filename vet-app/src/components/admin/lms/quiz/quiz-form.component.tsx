import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { useLesson } from "hooks/lms/lesson.hook";
import { useQuiz } from "hooks/lms/quiz.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IQuiz } from "models/lms/quiz";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  formMode: UpdateMode;
};
export const QuizForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { quiz, editQuiz, addQuiz } = useQuiz();
  const { lesson } = useLesson();
  const { setShow } = useModalContext();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onFinish = async (values: IQuiz) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IQuiz = {
      ...quiz,
      ...values,
      lessonId: lesson.id,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addQuiz(obj);
      if (feedback) {
        message.success("Quiz created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editQuiz(obj);
      if (feedback) {
        message.success("Quiz updated successfully!");
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
    initFormData(form, formMode, quiz);
  }, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="question"
          label="Question"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Question is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.List
          name="answers"
          rules={[
            {
              validator: async (_, answers) => {
                if (!answers || answers.length < 3) {
                  return Promise.reject(new Error("At least 3 answers"));
                } else {
                  return Promise.resolve(); // Resolve the Promise when validation passes
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Answers" : ""}
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
                          message: "Please input answer or delete this field.",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="answer" />
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
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="correctAnswerIndex"
          label="Correct Answer Index"
          requiredMark
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Correct Answer Index is required",
            },
          ]}
        >
          <InputNumber name="correctAnswerIndex" style={{ width: "100%" }} />
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
