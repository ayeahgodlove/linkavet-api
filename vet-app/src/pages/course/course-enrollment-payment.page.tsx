import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import BackButton from "components/shared/back-button.component";
import { useCourse } from "hooks/lms/course.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect, useState } from "react";
import "./course-detail.style.scss";
import { useNavigate } from "react-router-dom";
import { useInitTransaction } from "hooks/shopping-cart/init-transaction.hook";
import { IInitPayment } from "models/init-payment.model";
import { ProcessPaymentService } from "services/process-payment.service";
import { PiEqualsLight } from "react-icons/pi";
import slugify from "slugify";

const CourseEnrollmentPaymentPage: React.FC = () => {
  const { course } = useCourse();
  const [form] = Form.useForm();
  const [mode, setMode] = useState("mtn");
  const [method, setMethod] = useState("MOMO");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const { setInitTransaction, setActiveInitPayment } = useInitTransaction();

  const onFinish = async (values: any) => {
    setLoading(true);
    const obj: IInitPayment = {
      amount: `5`,
      operator: mode,
      telephone: values.telephone,
      name: values.name,
      email: values.email,
      address: values.address,
    };
    const feedback = await ProcessPaymentService.initPayment(obj)
      .then((response) => {
        setInitTransaction(response.data);
        return true;
      })
      .catch((error) => {
        console.log("error: ", error);
        setError(error);
        return false;
      });

    setActiveInitPayment(obj);

    if (feedback) {
      message.success("Payment Successful!");
      navigate(`/courses/${slugify(course.title, { lower: true })}/enrollment`);
    } else {
      message.error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const onChangePaymentMethod = (value: any) => {
    setMethod(value);
    console.log(value);
  };
  const onChange = (event: RadioChangeEvent) => {
    event.preventDefault();
    setMode(event.target.value);
  };

  useEffect(() => {}, [mode, method]);

  return (
    <GeneralAppShell>
      <Row className="checkout-container">
        <Col xs={24} md={14} className="checkout-form">
          <BackButton title="Shopping Cart" />
          <Typography.Title level={2}>Checkout</Typography.Title>
          <Divider style={{ marginBottom: 10 }} />
          <Typography.Paragraph style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>*</span>Pay through mobile money
          </Typography.Paragraph>

          <Select
            defaultValue="MOMO"
            style={{ marginBottom: 10, display: "block" }}
            onChange={onChangePaymentMethod}
            options={[
              { value: "MOMO", label: "Mobile Money" },
              { value: "CARD", label: "VISA Card" },
            ]}
          />

          {method === "MOMO" ? (
            <div style={{ margin: "1.2rem 0" }}>
              <Radio.Group
                onChange={onChange}
                value={mode}
                style={{ display: "block" }}
              >
                <Radio value={"mtn"}>MTN momo</Radio>
                <Radio value={"orange"}>Orange Money</Radio>
              </Radio.Group>

              <Space size={"middle"} className="momo-grid" align="center">
                {mode === "mtn" ? (
                  <Tooltip
                    title={<span style={{ color: "#333" }}>MTN momo</span>}
                    color="#f8cf11"
                  >
                    <Card
                      style={{ borderRadius: 0, cursor: "pointer" }}
                      bordered={false}
                      bodyStyle={{ padding: 5 }}
                      className="momo-card"
                    >
                      <img
                        src={"/momo/momo.png"}
                        alt="mtn momo"
                        height={120}
                        width={120}
                        style={{ borderRadius: 0 }}
                      />
                    </Card>
                  </Tooltip>
                ) : (
                  <Tooltip title={"Orange money"} color="#f50">
                    <Card
                      style={{ borderRadius: 0, cursor: "pointer" }}
                      bordered={false}
                      bodyStyle={{ padding: 5 }}
                      className="momo-card"
                    >
                      <img
                        src={"/momo/orange-momo.jpeg"}
                        alt="mtn momo"
                        height={120}
                        width={120}
                        style={{ borderRadius: 0 }}
                      />
                    </Card>
                  </Tooltip>
                )}
              </Space>
            </div>
          ) : (
            <div style={{ margin: "1.2rem 0" }}>
              <Tooltip
                title={<span style={{ color: "#333" }}>Stripe Payments</span>}
                color="#e6e6e6"
              >
                <Card
                  style={{ borderRadius: 0, cursor: "pointer" }}
                  bordered={false}
                  bodyStyle={{ padding: 5 }}
                  className="momo-card"
                >
                  <img
                    src={"/momo/stripe.png"}
                    alt="mtn momo"
                    height={130}
                    width={200}
                    style={{ borderRadius: 0 }}
                  />
                </Card>
              </Tooltip>
            </div>
          )}
          <Form
            form={form}
            name="checkout-form"
            layout="vertical"
            onFinish={onFinish}
          >
            {method === "MOMO" && (
              <Form.Item
                label="Telephone"
                name="telephone"
                rules={[
                  { required: true, message: "Please input your telephone!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            )}

            <Form.Item
              label={method === "MOMO" ? "Full Name" : "Card Holder Name"}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Address Line"
              name="address"
              rules={[
                { required: true, message: "Please input your address line!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={loading}
                block
                htmlType="submit"
                size="large"
              >
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={10} className="checkout-summary">
          <Typography.Title level={3}>Order details summary</Typography.Title>
          {/* summary details */}
          <>
            <>
              <Typography.Title
                style={{ marginBottom: 0, opacity: 0.78 }}
                level={5}
              >
                Summary Details:{" "}
              </Typography.Title>
              <Typography.Paragraph
                key={course.id}
                style={{ display: "block" }}
              >
                <span>Course Title</span> <PiEqualsLight />{" "}
                <span> {course.title}</span> <br />
                <span>Unit Price</span> <PiEqualsLight />{" "}
                <span>{course.price + "XAF"}</span>
              </Typography.Paragraph>
            </>

            <Typography.Title
              style={{ marginBottom: 0, opacity: 0.78 }}
              level={5}
            >
              Total Amount:{" "}
            </Typography.Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography.Title
                style={{
                  marginBottom: 0,
                  marginTop: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                level={4}
              >
                <span>
                  {course.price} {" XAF"}
                </span>
              </Typography.Title>
            </div>
          </>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default CourseEnrollmentPaymentPage;
