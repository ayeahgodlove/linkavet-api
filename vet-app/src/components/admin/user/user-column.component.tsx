import { Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUser } from "models/user.model";
import React from "react";

export const useUserColumn = () => {
  const userTableColumns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tel",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Is Verified?",
      dataIndex: "verified",
      key: "verified",
      render: (_, record) =>
        record.verified ? (
          <Badge color="green" text="YES" />
        ) : (
          <Badge color="red" text="NO" />
        ),
    },
  ];

  return {
    userTableColumns,
  };
};
