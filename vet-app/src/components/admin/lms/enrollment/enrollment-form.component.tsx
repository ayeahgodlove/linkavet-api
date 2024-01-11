import { Button, Form, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useCourse } from "hooks/lms/course.hook";
import { useEnrollment } from "hooks/lms/enrollment.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IEnrollment } from "models/lms/enrollment";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  formMode: UpdateMode;
};
export const EnrollmentForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { enrollment, editEnrollment, addEnrollment } = useEnrollment();
  const { setShow } = useModalContext();
  const { courses } = useCourse();
  const { user } = useAuth();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onFinish = async (values: IEnrollment) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IEnrollment = {
      ...enrollment,
      ...values,
      userId: user.id,
      enrollmentDate: new Date(),
      completionDate: new Date(),
      courseId: values.courseId,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addEnrollment(obj);
      if (feedback) {
        message.success("Enrollment created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editEnrollment(obj);
      if (feedback) {
        message.success("Enrollment updated successfully!");
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
    initFormData(form, formMode, enrollment);
  }, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="courseId"
          label="Course"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "CourseId is required",
            },
          ]}
        >
          <Select
            options={courses.map((c) => {
              return {
                value: c.id,
                label: c.description,
              };
            })}
            style={{ width: "100%", marginBottom: 15 }}
          />
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
