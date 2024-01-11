import { Col, Form, FormInstance, Input, InputNumber, Row, Select } from "antd";
import { useCategory } from "hooks/category.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useTag } from "hooks/tag.hook";
import { IProduct } from "models/product.model";
import React, { useEffect } from "react";

interface Props {
  form: FormInstance<any>;
  formValues: IProduct;
}

const ProductFormStepOne: React.FC<Props> = ({ form, formValues }) => {
  const { categories } = useCategory();
  const { tags } = useTag();
  const { initFormData } = useFormInit();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  useEffect(() => {
    form.validateFields();
  }, [form]);
  return (
    <div style={{ padding: 10 }}>
      <Row justify={"space-between"} align={"top"} gutter={[8, 8]}>
        <Col xs={24} span={24}>
          <Row gutter={[8, 8]}>
            <Col xs={24}>
              <Form.Item
                name="name"
                label="Name"
                requiredMark
                style={{ marginBottom: 3 }}
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                ]}
                initialValue={formValues.name}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="categoryId"
                label="Category"
                requiredMark
                style={{ marginBottom: 3 }}
                rules={[
                  {
                    required: true,
                    message: "Category is required",
                  },
                ]}
                initialValue={formValues.categoryId}
              >
                <Select
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
                requiredMark
                style={{ marginBottom: 3 }}
                rules={[
                  {
                    required: true,
                    message: "Tags is required",
                  },
                ]}
                initialValue={formValues.tags}
              >
                <Select
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
                requiredMark
                style={{ marginBottom: 3, width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Quantity is required",
                  },
                ]}
                initialValue={formValues.qtty}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={12} md={12}>
              <Form.Item
                name="amount"
                label="Amount"
                requiredMark
                style={{ marginBottom: 3, width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Amount is required",
                  },
                ]}
                initialValue={formValues.amount}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductFormStepOne;
