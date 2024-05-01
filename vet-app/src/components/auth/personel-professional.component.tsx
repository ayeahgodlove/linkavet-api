import React, { useState } from "react";

import {
  Row,
  Col,
  Divider,
  Form,
  Input,
  Button,
  Modal,
  List,
  Typography,
  Space,
  message,
} from "antd";

import { RiCloseFill } from "react-icons/ri";
import { useAuth } from "hooks/auth/auth.hook";
import { useSpecialty } from "hooks/specialty.hook";
import { ISpecialty } from "models/specialty.model";
import { FacebookFilled } from "@ant-design/icons";
import { CgWebsite } from "react-icons/cg";
import { UpdateMode } from "models/shared/update-mode.enum";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import { format } from "utils/format";

export default function ProfessionalInfoProfile() {
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const { user } = useAuth();
  const { getSpeciality, saveTransaction } = useSpecialty();
  const specialty = getSpeciality(user.id);

  console.log("specialty: ", specialty);
  const handleSubmit = async (values: any) => {
    const obj: ISpecialty = {
      ...specialty,
      ...values,
      userId: user.id,
      username: user.username,
    };

    const updateMode: UpdateMode =
      specialty.fullname.length === 0 ? UpdateMode.ADD : UpdateMode.EDIT;
    const feedback = await saveTransaction(updateMode, obj);
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

  return (
    <>
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
          onFinish={handleSubmit}
          initialValues={{ ...specialty }}
        >
          <Form.Item
            name="twitter"
            label="Twitter"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Twitter is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fullname"
            label="Fullname"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Full Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="yearsOfExperience"
            label="Years Of Experience"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Years Of Experience is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Title is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Website is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="facebook"
            label="Facebook"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Facebook is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkedin"
            label="Linkedin"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Linkedin is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="specialty"
            label="Specialty"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Specialty is required",
              },
            ]}
          >
            <Input />
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

      <Col md={15} span={24}>
        <h2>Professional Informations</h2>
        <p>View and update information</p>
      </Col>
      <Divider />

      <Row align="middle" justify="space-between">
        <Col md={12}>
          <h3>Information</h3>
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
            label: "Title",
            value: specialty.title,
          },
          {
            label: "Full Name",
            value: specialty.fullname,
          },
          {
            label: "Specialty",
            value: specialty.specialty,
          },

          {
            label: "Website",
            value: (
              <a target="_blank" href={specialty.website}>
                <CgWebsite size={25} />
              </a>
            ),
          },
          {
            label: "Facebook",
            value: (
              <a target="_blank" href={specialty.facebook}>
                <FiFacebook size={25} />
              </a>
            ),
          },
          {
            label: "Twitter",
            value: (
              <a target="_blank" href={specialty.twitter}>
                <FiTwitter size={25} />
              </a>
            ),
          },
          {
            label: "LinkedIn",
            value: (
              <a target="_blank" href={specialty.linkedin}>
                <FiLinkedin size={25} />
              </a>
            ),
          },
          {
            label: "Year of Experience",
            value: format.twoChar(specialty.yearsOfExperience.toString()),
          },
        ]}
        renderItem={(item) => (
          <List.Item>
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
    </>
  );
}
