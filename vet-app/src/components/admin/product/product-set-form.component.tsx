import { Button, Form, Steps, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductFormStepOne from "./product-form-step-one.component";
import ProductFormStepTwo from "./product-form-step-two.component";
import ProductFormStepUploads from "./product-form-step-uploads.component";
import { useForm } from "antd/es/form/Form";
import { useProduct } from "../../../hooks/product.hook";
import { emptyProduct, IProduct } from "../../../models/product.model";
import { FormErrorComponent } from "../../../components/shared/form-error/form-error.component";
import { useNavigate } from "react-router-dom";

const ProductStepForm: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const { addProduct } = useProduct();
  const navigate = useNavigate();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(emptyProduct);

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

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
 
  const steps = [
    {
      title: "Product Images",
      content: (
        <ProductFormStepUploads
          form={form}
        />
      ),
    },
    {
      title: "Product Details",
      content: <ProductFormStepOne form={form} />,
    },
    {
      title: "Product Description",
      content: <ProductFormStepTwo form={form} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {}, [hasSubmitted]);
  return (
    <>
      <Steps current={current} items={items} />
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
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={submitting}
            >
              Submit
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default ProductStepForm;

const contentStyle: React.CSSProperties = {
  lineHeight: "260px",
  border: `1px dashed #ddd`,
  marginTop: 16,
};
