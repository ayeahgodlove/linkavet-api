import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { modules } from "config/constant";
import { useModalContext } from "context/app-modal.context";
import { useCategory } from "hooks/category.hook";
import { useProduct } from "hooks/product.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useUpload } from "hooks/shared/upload.hook";
import { useStore } from "hooks/store.hook";
import { useTag } from "hooks/tag.hook";
import { IProduct, ProductFormData } from "models/product.model";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  formMode: UpdateMode;
};
export const ProductForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { product, editProduct, addProduct } = useProduct();
  const { categories } = useCategory();
  const { tags } = useTag();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();
  const { getUserStore } = useStore();
  const { beforeUpload, onRemove, normFile, fileList } = useUpload();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = async (values: IProduct) => {
    setSubmitting(true);
    setSubmitted(false);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shortDescription", values.shortDescription);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    // values.tags.forEach((tag) => {
    formData.append("tags", JSON.stringify(values.tags));
    // });
    formData.append("amount", values.amount.toString());
    formData.append("qtty", values.qtty.toString());
    formData.append("storeId", `${getUserStore()?.id}`);

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      formData.append("productImages", file);
    });

    console.log("fileList: ", fileList);
    if (formMode === UpdateMode.ADD) {
      const feedback = await addProduct(formData as any);
      if (feedback) {
        message.success("Product created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    const formData2: ProductFormData = {
      ...formData,
      id: product.id,
    };

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editProduct(formData2 as any);
      if (feedback) {
        message.success("Product updated successfully!");
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
    initFormData(form, formMode, product);
  }, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row justify={"space-between"} align={"top"} gutter={[8, 8]}>
          <Col xs={24} lg={12}>
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
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={12}>
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
            >
              <ReactQuill
                modules={modules}
                theme="snow"
                onChange={(html) => form.setFieldValue("description", html)}
                placeholder="Enter description..."
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="productImages"
          label="Upload Product Images"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Upload is required",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={beforeUpload}
            onRemove={onRemove}
            name="productImages"
            fileList={fileList}
            type="drag"
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          disabled={submitting}
          style={{ marginTop: 15 }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
