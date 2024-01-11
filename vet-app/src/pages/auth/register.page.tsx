import GeneralAppShell from "layout/app/general-app-shell";
import React, { useState } from "react";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
  message,
} from "antd";
import "../../styles/login.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useUser } from "hooks/user.hook";
import { IUser, emptyUser } from "models/user.model";
import { useAuth } from "hooks/auth/auth.hook";

const RegisterPage: React.FC = () => {
  const { registerUserFunction } = useAuth();
  const [form] = Form.useForm();
  const router = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("pet-owner");
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    const obj: IUser = {
      ...emptyUser,
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      userRole: value,
    };

    const feedback = registerUserFunction(obj);
    if (feedback) {
      message.success("User Registered Sucessfully!");
      // router("/auth/check-email");
      setSuccess(true);
    } else {
      message.error("Registration failed!");
      setSuccess(false);
    }
    setSubmitting(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <GeneralAppShell>
      <Row
        justify={"center"}
        align="middle"
        className="form__container"
        style={{
          background: "url(./images/bg-1-removebg-preview.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
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
          {success && (
            <Alert
              type="success"
              style={{ marginBottom: 20 }}
              message={
                <Typography.Title level={5}>
                  Verify your account!
                </Typography.Title>
              }
              description={
                <Typography.Paragraph>
                  Click on the link sent to your email to verify your email
                </Typography.Paragraph>
              }
              closable
            />
          )}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Row justify={"space-between"} align={"middle"}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  rules={[
                    { required: true, message: "Please input your Firstname!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="firstname"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  rules={[
                    { required: true, message: "Please input your Lastname!" },
                  ]}
                  style={{
                    marginLeft: 5,
                  }}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="lastname"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MdEmail className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your PhoneNumber!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="PhoneNumber"
              />
            </Form.Item>

            <Form.Item
              name={"userRole"}
              rules={[{ message: "Select your role!" }]}
            >
              <>
                <p style={{ marginBottom: 2 }}>what is your role?</p>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={"pet-owner"}>Pet Owner</Radio>
                  <Radio value={"farmer"}>Famer</Radio>
                  <Radio value={"doctor"}>Doctor</Radio>
                  <Radio value={"student"}>Student</Radio>
                  <Radio value={"researcher"}>Researcher</Radio>
                </Radio.Group>
              </>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
                loading={isSubmitting}
              >
                Register
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
              Or <Link to="/auth/login">login now!</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default RegisterPage;
