import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  message,
} from "antd";
import React, { useEffect } from "react";
import { useAuth } from "../../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../../models/shared/update-mode.enum";
import { useModalContext } from "../../../../context/app-modal.context";
import { useFormInit } from "../../../../hooks/shared/form-init.hook";
import theme from "../../../../utils/themeConfig";
import { useCourse } from "../../../../hooks/lms/course.hook";
import { ICourse, emptyCourse } from "../../../../models/lms/course";
import useWindowSize from "../../../../hooks/shared/window-resize.hook";
import UploadImage from "components/shared/upload-image";

type Props = {
  formMode: UpdateMode;
};

const CourseForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addCourse, editCourse, course } = useCourse();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();

  const { width } = useWindowSize();

  const handleImageUpload = (url: string) => {
    form.setFieldValue("courseImage", url);
  };

  const onFinish = async (values: ICourse) => {
    const obj1: ICourse = {
      ...emptyCourse,
      ...values,
      id: course.id,
      authorId: user.id,
    };
    if (formMode === UpdateMode.ADD) {
      const feedback = await addCourse(obj1);
      if (feedback) {
        message.success("Course created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }
    const obj2: ICourse = {
      ...course,
      ...values,
      id: course.id,
      authorId: user.id,
    };

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editCourse(obj2);
      if (feedback) {
        message.success("Course updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };

  useEffect(() => {
    initFormData(form, formMode, course);
  }, []);
  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={emptyCourse}
      >
        <Form.Item
          name={"title"}
          label="Title"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input size="large" />
        </Form.Item>
        <Row justify={"space-between"} align={"middle"}>
          {
            <Col span={width >= 768 ? 8 : 24}>
              <Form.Item
                name={"price"}
                label="Price"
                required={true}
                rules={[
                  { required: true, message: "This field is a required field" },
                ]}
                style={{ marginBottom: 10 }}
              >
                <InputNumber size="large" style={{ width: "95%" }} />
              </Form.Item>
            </Col>
          }

          <Col span={width >= 768 ? 8 : 12}>
            <Form.Item
              name={"startDate"}
              label="Start Date"
              required={true}
              rules={[
                { required: true, message: "This field is a required field" },
              ]}
              style={{ marginBottom: 10 }}
            >
              <DatePicker size="large" style={{ width: "95%" }} />
            </Form.Item>
          </Col>

          <Col span={width >= 768 ? 8 : 12}>
            <Form.Item
              name={"completionDate"}
              label="Completion Date"
              required={true}
              rules={[
                { required: true, message: "This field is a required field" },
              ]}
              style={{ marginBottom: 10 }}
            >
              <DatePicker size="large" style={{ width: "95%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={"description"}
          label="Description"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input.TextArea size="large" rows={3} />
        </Form.Item>

        <Form.Item
          name="courseImage"
          label="Upload"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "Upload is required",
            },
          ]}
        >
          <UploadImage
            maxCount={1}
            folderName="courses"
            onUpload={handleImageUpload}
            name="courseImage"
          />
        </Form.Item>
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form>
    </ConfigProvider>
  );
};

export default CourseForm;
