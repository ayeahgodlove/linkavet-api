import { ColumnsType } from "antd/es/table";
import { ISubscriber } from "../../../models/subscriber.model";
import { format } from "utils/format";
import React from "react";
import { Button, message, Space } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSubscriber } from "hooks/subscriber.hook";

export const useSubscriberColumn = () => {
  const { delSubscriber } = useSubscriber();
  const handleDelete = async (record: ISubscriber) => {
    const feedback = await delSubscriber(record);
    if (feedback) {
      message.success("Deleted Successfully!");
    } else {
      message.error("Failed to delete!");
    }
  };
  const subscriberTableColumns: ColumnsType<ISubscriber> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filtered: true,
      render: (_, record, index) => (
        <p key={record.id}>{format.twoChar((index + 1).toString())}</p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Signup Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => format.date(record.createdAt),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <Space key={record.id}>
            <Button
              danger
              icon={<MdOutlineDeleteOutline size={22} />}
              onClick={() => handleDelete(record)}
              size="small"
            />
          </Space>
        );
      },
    },
  ];

  return {
    subscriberTableColumns,
  };
};
