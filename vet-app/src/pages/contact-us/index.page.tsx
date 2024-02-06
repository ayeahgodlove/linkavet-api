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
} from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import {
  BiLocationPlus,
  BiMailSend,
  BiPhone,
  BiPhoneCall,
} from "react-icons/bi";
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
              <Card bordered={false}>
                <h2>Looking for us? Contact us.</h2>
                <p>
                  Can't find your answer here? Call us at +237673687549 or email
                  us at linkavet.support@gmail.com
                </p>
              </Card>
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
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        {/* <Button htmlType="reset">Reset</Button> */}
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
                      style={{ marginBottom: 10}}
                      showIcon={true}
                      type="success"
                      icon={<BiPhone />}
                      description={<>(120) 456-789-123</>}
                    />

                    <Alert
                      type="success"
                      showIcon={true}
                      icon={<BiMailSend />}
                      description={<>support@yourmail.com</>}
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
