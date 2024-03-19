import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import React from "react";

const { Title, Paragraph } = Typography;
const Subscribe = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Card
      bordered={false}
      style={{
        background: "#fff",
        borderRadius: 0,
        padding: 30
      }}
    >
      <Row justify={"center"} align={"middle"}>
        <Col xs={24} md={24} lg={24}>
          <Title
            style={{
              textAlign: "center",
              lineHeight: 1.5,
              fontSize: 40,
              marginBottom: 0,
            }}
          >
            Stay up-to-date
          </Title>
          <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
            <p>
              Sign up for our newsletter to receive awesome discounts and
              exciting news.
            </p>
          </Paragraph>
        </Col>
        <Col xs={24} md={15} lg={8}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Enter your full name!" }]}
            >
              <Input placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="Enter your email address" size="large" />
            </Form.Item>

            <Form.Item
              style={{
                display: "block",
                width: "100%",
              }}
            >
              <Button
                type="default"
                htmlType="submit"
                className="login-form-button"
                size="large"
                style={{
                  display: "block",
                  paddingLeft: 15,
                  paddingRight: 15,
                  width: "100%",
                }}
                block={true}
              >
                Subscribe Now
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default Subscribe;
