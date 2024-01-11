import { Col, Form, Input } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { modules } from "config/constant";
import { IProduct } from "models/product.model";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";

interface Props {
  form: FormInstance<any>;
  formValues: IProduct;
}

const ProductFormStepTwo: React.FC<Props> = ({ form, formValues }) => {
  useEffect(() => {
    form.validateFields();
  }, [form]);
  return (
    <div style={{ padding: 10 }}>
      <Col xs={24} span={24}>
        <Form.Item
          name="shortDescription"
          label="Short Description"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Short Description is required",
            },
          ]}
          initialValue={formValues.shortDescription}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={"description"}
          label="Description"
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
          // initialValue={formValues.description}
        >
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={(html) => form.setFieldValue("description", html)}
            placeholder="Enter description..."
          />
        </Form.Item>
      </Col>
    </div>
  );
};

export default ProductFormStepTwo;
