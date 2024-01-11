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
  Upload,
  message,
} from "antd";
import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useModalContext } from "context/app-modal.context";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useUpload } from "hooks/shared/upload.hook";
import theme from "utils/themeConfig";
import { useCourse } from "hooks/lms/course.hook";
import { CourseFormData, ICourse, emptyCourse } from "models/lms/course";
import useWindowSize from "hooks/shared/window-resize.hook";

type Props = {
  formMode: UpdateMode;
};

const CourseForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addCourse, editCourse, course } = useCourse();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();
  const { fileList, onChangeUpload, onRemove, beforeUpload, progress } =
    useUpload();
  const { width } = useWindowSize();

  const onFinish = async (values: ICourse) => {
    const formData = new FormData();
    formData.append("id", course.id);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("authorId", user.id);
    formData.append("price", values.price.toString());
    formData.append("startDate", values.startDate.toISOString());
    formData.append("completionDate", values.completionDate.toISOString());

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      formData.append("courseImage", file);
    });

    if (formMode === UpdateMode.ADD) {
      const feedback = await addCourse(formData);
      if (feedback) {
        message.success("Course created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }
    const obj1: CourseFormData = {
      ...formData,
      id: course.id,
    };

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editCourse(obj1);
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
          <Input />
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
                <InputNumber style={{ width: "95%" }} />
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
              <DatePicker style={{ width: "95%" }} />
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
              <DatePicker style={{ width: "95%" }} />
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
          <Input.TextArea rows={3} />
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
          <Upload
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={onChangeUpload}
            onRemove={onRemove}
            progress={progress}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form>
    </ConfigProvider>
  );
};

export default CourseForm;
