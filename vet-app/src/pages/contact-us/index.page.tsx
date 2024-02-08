import {
  Alert,
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { BiLocationPlus, BiMailSend, BiPhone } from "react-icons/bi";
import theme from "utils/themeConfig";

const ContactUsPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };
  return (
    <GeneralAppShell>
      <ConfigProvider theme={theme}>
        <div style={{ margin: "3rem 0" }}>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col xs={22} md={20}>
              <Typography.Title level={1} style={{ marginBottom: 0 }}>
                Contact Us
              </Typography.Title>
              <Typography.Paragraph>
                If you have any questions or inquiries, please fill out the form
                below to contact us.
              </Typography.Paragraph>
            </Col>

            <Col xs={22} md={20}>
              <Card bordered={false}>
                <Row gutter={[8, 8]} justify={"space-between"}>
                  <Col xs={22} md={12}>
                    <Form
                      form={form}
                      onFinish={onFinish}
                      layout="vertical"
                      initialValues={{
                        name: "",
                        email: "",
                        message: "",
                      }}
                    >
                      <Form.Item
                        name={"name"}
                        label="Name"
                        required={true}
                        rules={[
                          {
                            required: true,
                            message: "This field is a required field",
                          },
                        ]}
                        style={{ marginBottom: 10 }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name={"email"}
                        label="Email"
                        required={true}
                        rules={[
                          {
                            required: true,
                            message: "This field is a required field",
                          },
                        ]}
                        style={{ marginBottom: 10 }}
                      >
                        <Input type="" />
                      </Form.Item>
                      <Form.Item
                        name={"message"}
                        label="Message Us"
                        required={true}
                        rules={[
                          {
                            required: true,
                            message: "This field is a required field",
                          },
                        ]}
                        style={{ marginBottom: 10 }}
                      >
                        <Input.TextArea />
                      </Form.Item>

                      <Space>
                        <ConfigProvider
                          theme={{
                            token: {
                              colorPrimary: "#49a91c",
                              colorLink: "#2980b9",
                            },
                          }}
                        >
                          <Button type="primary" htmlType="submit">
                            Save
                          </Button>
                        </ConfigProvider>
                      </Space>
                    </Form>
                  </Col>
                  <Col xs={22} md={12}>
                    <Alert
                      style={{ marginBottom: 10, marginTop: 20 }}
                      showIcon={true}
                      type="success"
                      icon={<BiLocationPlus />}
                      description={
                        <>795 Folsom Ave, Suite 600 San Francisco, CA 94107</>
                      }
                    />

                    <Alert
                      style={{ marginBottom: 10 }}
                      showIcon={true}
                      type="success"
                      icon={<BiPhone />}
                      description={<>+(237) 673-687-549</>}
                    />

                    <Alert
                      type="success"
                      showIcon={true}
                      icon={<BiMailSend />}
                      description={<>linkavet.support@gmail.com</>}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </GeneralAppShell>
  );
};

export default ContactUsPage;
