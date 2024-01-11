import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import "../../styles/login.style.scss";
import { Link, Navigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useAuth } from "hooks/auth/auth.hook";
import { useMessageContext } from "context/session.context";
import useWindowSize from "hooks/shared/window-resize.hook";

const LoginPage: React.FC = () => {
  const { loginUserFunction, isAuthenticated, user } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const [go, setGo] = useState(false);
  const { session } = useMessageContext();
  const { width } = useWindowSize();
  

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await loginUserFunction({
      email: values.email,
      password: values.password,
    });
    setSubmitting(false);
  };

  useEffect(() => {
    (async () => {
      if (isAuthenticated && user) {
        message.success("Login Successful!");
        setGo(true);
      }
    })();
  }, [isAuthenticated, user]);

  if (go) {
    return <Navigate to={"/callback"} />;
  }

  return (
    <GeneralAppShell>
      <Row
        justify={"center"}
        align="middle"
        className="form__container"
        // style={{
        //   background: "url(./images/bg-1-removebg-preview.png)",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "left",
        // }}
      >
        {session.title.length > 0 ? (
          <Col span={24}>
            <Alert
              banner
              icon={session.icon}
              description={session.message}
              message={session.title}
              style={{ width: width >= 768 ? "380px" : "80%", margin: "1rem auto" }}
            />
          </Col>
        ) : (
          <></>
        )}
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
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MdEmail className="site-form-item-icon" />}
                placeholder="Email"
              />
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to="/auth/forgot-password">
                Forgot password
              </Link>
            </div>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
                loading={isSubmitting}
              >
                Log in
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
              Or <Link to="/auth/register">register now!</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default LoginPage;
