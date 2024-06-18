import {
  Button,
  Form,
  message,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useProduct } from "../../../hooks/product.hook";
import { emptyProduct, IProduct } from "../../../models/product.model";
import { FormErrorComponent } from "../../shared/form-error/form-error.component";
import { useNavigate } from "react-router-dom";
import UploadImage from "components/shared/upload-image";
import { useCategory } from "hooks/category.hook";
import { useTag } from "hooks/tag.hook";
import { modules } from "../../../config/constant";
import ReactQuill from "react-quill";

const ProductStepForm: React.FC = () => {
  const [form] = useForm();
  const { addProduct } = useProduct();
  const navigate = useNavigate();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(emptyProduct);

  const { categories } = useCategory();
  const { tags } = useTag();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = async (values: any) => {
    setSubmitting(true);
    setSubmitted(false);

    const formData: IProduct = {
      ...formValues,
      ...values,
    };

    const feedback = await addProduct(formData);
    if (feedback) {
      message.success("Product created successfully!");
      navigate("/admin/products");
    } else {
      message.error("failed to create");
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  const handleImageUpload = (url: string) => {
    const images = form.getFieldValue("productImages") || [];
    form.setFieldsValue({
      productImages: [...images, url],
    });
  };

  useEffect(() => {}, [hasSubmitted]);
  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />
      <Form
        onValuesChange={(changedValues, allValues) => {
          console.log(changedValues);
          setFormValues({ ...formValues, ...allValues });
        }}
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Form.Item
          name="productImages"
          label="Upload Image"
          style={{ marginTop: 13 }}
          rules={[
            {
              required: true,
              message: "Images are required",
            },
          ]}
        >
          <UploadImage
            maxCount={4}
            folderName="products"
            onUpload={handleImageUpload}
            name="imageUrl"
          />
        </Form.Item>
        <Row justify={"space-between"} align={"top"} gutter={[8, 8]}>
          <Col xs={24} span={24}>
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  style={{ marginBottom: 3 }}
                  rules={[
                    {
                      required: true,
                      message: "Name is required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="categoryId"
                  label="Category"
                  style={{ marginBottom: 3 }}
                  rules={[
                    {
                      required: true,
                      message: "Category is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={categories.map((c) => {
                      return {
                        value: c.id,
                        label: c.name,
                      };
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="tags"
                  label="Select Tags"
                  style={{ marginBottom: 3 }}
                  rules={[
                    {
                      required: true,
                      message: "Tags is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    mode="multiple"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={tags.map((c) => {
                      return {
                        value: c.id,
                        label: c.name,
                      };
                    })}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} md={12}>
                <Form.Item
                  name="qtty"
                  label="Quantity"
                  style={{ marginBottom: 3, width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Quantity is required",
                    },
                  ]}
                >
                  <InputNumber size="large" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={12} md={12}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  style={{ marginBottom: 3, width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Amount is required",
                    },
                  ]}
                >
                  <InputNumber size="large" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Col xs={24} span={24}>
          <Form.Item
            name="shortDescription"
            label="Short Description"
            style={{ marginBottom: 3 }}
            rules={[
              {
                required: true,
                message: "Short Description is required",
              },
            ]}
          >
            <Input.TextArea size="large" />
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
          >
            <ReactQuill
              modules={modules}
              theme="snow"
              onChange={(html) => form.setFieldValue("description", html)}
              placeholder="Enter description..."
            />
          </Form.Item>
        </Col>
        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            disabled={submitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProductStepForm;
