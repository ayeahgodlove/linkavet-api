import React from "react";
import { Form, Col, Input, Row } from "antd";

import "./contact.less";
import { Container } from "components/shared/container/container";
import { AppButton } from "components/shared/app-button/app-button";
import { SectionHeading } from "components/shared/section-heading/section-heading";

export const ContactForm = () => {
  const { Item } = Form;

  return (
    <section id="contact" className="contact">
      <Container>
        <SectionHeading
          heading="Get In Touch"
          subHeading="Have a question, need assistance, or simply want to reach out? We're here for you at Linkavet. Contact our friendly team of veterinary experts to discuss your pet's needs, inquire about our products, or schedule an appointment."
        />
        <Row gutter={24} className="contact__form">
          <Col sm={24} lg={12}>
            <Form>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Item>
                    <Input placeholder="Name" />
                  </Item>
                </Col>
                <Col xs={24} md={12}>
                  <Item>
                    <Input placeholder="Subject" />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Item>
                    <Input placeholder="Email" />
                  </Item>
                </Col>
                <Col xs={24} md={12}>
                  <Item>
                    <Input placeholder="Budget" />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Item>
                    <Input.TextArea rows={5} placeholder="Write Message" />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Item>
                    <AppButton type="primary">Submit</AppButton>
                  </Item>
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
