import React, { useState } from "react";

import {
  Row,
  Col,
  Divider,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Modal,
  List,
  Tag,
  Typography,
  Space,
  Select,
  message,
} from "antd";

import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import { useAuth } from "hooks/auth/auth.hook";
import { useUser } from "hooks/user.hook";
import { IUser } from "models/user.model";

export default function InfoProfile() {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [preferanceModalVisible, setPreferanceModalVisible] = useState(false);

  const { user } = useAuth();
  const { editUser, getUser } = useUser();

  const handleEditUser = async (values: any) => {
    const obj: IUser = {
      ...getUser(user.id),
      ...values,
    };

    const feedback = await editUser(obj);
    if (feedback) {
      message.success("Information Updated Successfully!");
    } else {
      message.error("Failed to update information!");
    }
  };
  const contactModalShow = () => {
    setContactModalVisible(true);
  };

  const contactModalCancel = () => {
    setContactModalVisible(false);
  };

  const preferanceModalShow = () => {
    setPreferanceModalVisible(true);
  };

  const preferanceModalCancel = () => {
    setPreferanceModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="Contact Edit"
        width={416}
        centered
        open={contactModalVisible}
        onCancel={contactModalCancel}
        footer={null}
        closeIcon={<RiCloseFill size={24} />}
      >
        <Form
          layout="vertical"
          onFinish={handleEditUser}
          initialValues={{ ...getUser(user.id) }}
        >
          <Form.Item
            label="First Name"
            name="firstname"
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="UserName"
            name="username"
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" style={{ marginBottom: 10 }}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phoneNumber"
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            style={{ marginBottom: 10 }}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Space>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={contactModalCancel}
            >
              Edit
            </Button>

            <Button block onClick={contactModalCancel}>
              Cancel
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Preferance Edit"
        width={316}
        centered
        open={preferanceModalVisible}
        onCancel={preferanceModalCancel}
        footer={null}
        closeIcon={<RiCloseFill size={24} />}
      >
        <Form layout="vertical" name="basic" initialValues={{ remember: true }}>
          <Form.Item label="Language" name="language">
            <Select
              options={[
                { label: "English", value: "en" },
                { label: "French", value: "fr" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Date Format" name="dateformat">
            <DatePicker className="hp-w-100" suffixIcon={<RiCalendarLine />} />
          </Form.Item>

          <Form.Item label="Timezone" name="timezone">
            <TimePicker />
          </Form.Item>

          <Row>
            <Col md={12} span={24}>
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={preferanceModalCancel}
              >
                Edit
              </Button>
            </Col>

            <Col md={12} span={24}>
              <Button block onClick={preferanceModalCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Col md={15} span={24}>
        <h2>Personal Informations</h2>
        <p>View and update information</p>
      </Col>
      <Divider />

      <Row
        align="middle"
        justify={"space-between"}
        gutter={[16, 16]}
        style={{ width: "100%" }}
      >
        <Col md={12}>
          <h3 style={{ marginBottom: 0 }}>Contact</h3>
        </Col>

        <Col md={12}>
          <Button type="primary" ghost onClick={contactModalShow}>
            Edit
          </Button>
        </Col>
      </Row>

      <List
        size="small"
        dataSource={[
          {
            label: "First Name",
            value: user.firstname,
          },
          {
            label: "Last Name",
            value: user.lastname,
          },
          {
            label: "Username",
            value: user.username,
          },
          {
            label: "Email",
            value: user.email,
          },
          {
            label: "Telephone",
            value: user.phoneNumber,
          },
          {
            label: "Address",
            value: getUser(user.id).address,
          },
          {
            label: "Is Verified",
            value: user.verified ? (
              <Tag color="green">Verified</Tag>
            ) : (
              <Tag color="red">Unverified</Tag>
            ),
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row justify={"space-between"} style={{ width: "100%" }}>
              <Col md={8}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={16}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
        style={{ display: "block" }}
      />

      <Divider />

      <Row
        align="middle"
        justify="space-between"
        gutter={[16, 16]}
        style={{ width: "100%" }}
      >
        <Col md={12}>
          <h3>Preferance</h3>
        </Col>

        <Col md={12}>
          <Button type="primary" ghost onClick={preferanceModalShow}>
            Edit
          </Button>
        </Col>
      </Row>

      <List
        size="small"
        dataSource={[
          {
            label: "Language",
            value: "English",
          },
        ]}
        renderItem={(item) => (
          <List.Item style={{ width: "100%" }}>
            <Row style={{ width: "100%" }}>
              <Col xs={8}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col xs={16}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}
