import { ColumnsType } from "antd/es/table";
import { IMail } from "../../../models/mail.model";
import { Button, Space, Tag } from "antd";
import React from "react";
import { FiDelete, FiEdit, FiSend } from "react-icons/fi";

// senderEmail: string;
// receiverEmails: string[];
// type: string;
// headline: string;
// status: MAIL_STATUS;
// cta: string;
// content: string

export const useMailColumn = () => {
  const mailTableColumns: ColumnsType<IMail> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
    },
    {
      title: "HEADLINE",
      dataIndex: "headline",
      key: "headline",
      filtered: true,
    },
    {
      title: "Receivers",
      dataIndex: "receiverEmails",
      key: "receiverEmails",
      render: (_, record) =>
        record.receiverEmails.map((r) => <Tag color="#27b025">{r}</Tag>),
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      filtered: true,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "CTA",
      dataIndex: "cta",
      key: "cta",
    },

    {
      title: "Operations",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <Space key={record.id}>
            <Button icon={<FiDelete />} danger />
            <Button icon={<FiEdit />} />
            <Button icon={<FiSend />} type="primary" />
          </Space>
        );
      },
    },
  ];

  return {
    mailTableColumns,
  };
};
