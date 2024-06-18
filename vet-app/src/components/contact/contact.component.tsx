import React, { useState } from "react";
import { Form, Col, Input, Row, message, Button } from "antd";

import "./contact.less";
import { Container } from "../../components/shared/container/container";
import { AppButton } from "../../components/shared/app-button/app-button";
import { SectionHeading } from "../../components/shared/section-heading/section-heading";
import { useContact } from "hooks/contact.hook";
import { useForm } from "antd/es/form/Form";
import { emptyContact } from "models/contact";

export const ContactForm = () => {
  const { Item } = Form;

  const [load, setLoad] = useState(false);
  const { addContact } = useContact();
  const [form] = useForm();

  const handleSubscribe = async (values: any) => {
    setLoad(true);
    const feedback = await addContact({
      ...emptyContact,
      ...values,
    });

    if (feedback) {
      message.success("You have subscribe successfully!");
      form.resetFields();
    } else {
      message.error("subscribe failed!");
    }
    setLoad(false);
  };

  return (
    <section id="contact" className="contact">
      <Container>
        <SectionHeading
          className=""
          heading="Get In Touch"
          subHeading="Have a question, need assistance, or simply want to reach out? We're here for you at Linkavet. Contact our friendly team of veterinary experts to discuss your pet's needs, inquire about our products, or schedule an appointment."
        />
        <Row gutter={24} className="contact__form">
          <Col sm={24} lg={12}>
            <Form
              form={form}
              onFinish={handleSubscribe}
              initialValues={emptyContact}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Item name={"name"}>
                    <Input size="large" placeholder="Name" />
                  </Item>
                </Col>
                <Col xs={24} md={12}>
                  <Item name={"email"}>
                    <Input size="large" placeholder="Email" />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} md={24}>
                  <Item name={"subject"}>
                    <Input size="large" placeholder="Subject" />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Item name={"message"}>
                    <Input.TextArea
                      size="large"
                      rows={5}
                      placeholder="Write Message"
                    />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={load}
                    className={`app-button`}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={24} lg={12}>
            <div className="contact__img">
              <img src={"./images/contact.8acabe53.png"} alt={"contact file"} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
