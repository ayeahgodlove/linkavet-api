import { Col, Form, FormInstance, Input, InputNumber, Row, Select } from "antd";
import { useCategory } from "../../../hooks/category.hook";
import { useTag } from "../../../hooks/tag.hook";
import React, { useEffect } from "react";

interface Props {
  form: FormInstance<any>;
}

const ProductFormStepOne: React.FC<Props> = ({ form }) => {
  const { categories } = useCategory();
  const { tags } = useTag();

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
                style={{ marginBottom: 3 }}
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                ]}
              >
                <Input />
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
                <InputNumber style={{ width: "100%" }} />
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
