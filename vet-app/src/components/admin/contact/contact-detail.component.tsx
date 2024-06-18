import { Card, Col, List, Row, Typography } from "antd";
import { useContact } from "../../../hooks/contact.hook";
import React from "react";

const ContactDetailComponent: React.FC = () => {
  const { contact } = useContact();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Name",
            value: contact.name,
          },
          {
            label: "Email",
            value: contact.email,
          },
          {
            label: "Subject",
            value: contact.subject,
          },
          {
            label: "Message",
            value: contact.message,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ContactDetailComponent;
