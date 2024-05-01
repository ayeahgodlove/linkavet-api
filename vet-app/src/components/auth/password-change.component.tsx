import React from "react";

import { Row, Col, Divider, Form, Input, Button } from "antd";

export default function PasswordProfile() {

  return (
    <Row>
      <Col span={24}>
        <h2>Change Password</h2>
        <p>
          Set a unique password to protect your account.
         </p>

        <Divider />
      </Col>

      <Col xxl={5} xl={10} md={15} span={24}>
        <Form layout="vertical" name="basic">
          <Form.Item
            label={
              <span>
                Old Password :
              </span>
            }
            name="old-password"
          >
            <Input placeholder="Placeholder text" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Old Password :
              </span>
            }
            name="new-password"
          >
            <Input placeholder="Placeholder text" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Confirm New Password :
              </span>
            }
            name="confirm-new-password"
          >
            <Input placeholder="Placeholder text" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}