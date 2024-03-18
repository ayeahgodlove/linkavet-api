import React from "react";
import {  UserOutlined } from "@ant-design/icons";
import { Button,  Col, Form, Input, Row } from "antd";
import "../../styles/login.style.scss";
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row
        justify={"center"}
        align="middle"
        className="form__container"
      >
        <Col
          xs={18}
          sm={12}
          lg={6}
          style={{
            background: "#fffff3",
            padding: "50px 20px",
            borderRadius: 10,
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Reset
              </Button>{" "}
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Or <Link to="/auth/login">Go back!</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPasswordPage;
