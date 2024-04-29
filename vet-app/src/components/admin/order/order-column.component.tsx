import { ColumnsType } from "antd/es/table";
import { useUser } from "../../../hooks/user.hook";
import { IOrder } from "../../../models/order.model";
import React from "react";
import { format } from "utils/format";

export const useOrderColumn = () => {
  const { getUser } = useUser();

  const orderTableColumns: ColumnsType<IOrder> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filtered: true,
      render: (_, record, index) => <span key={record.id}>{index + 1}</span>,
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      filtered: true,
      render: (_, record) => format.date(record.createdAt),
    },
    {
      title: "USERNAME",
      dataIndex: "user",
      key: "user",
      filtered: true,
      render: (_, record) => getUser(record.userId!).username,
    },
    {
      title: "UNIT PRICE",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "ORDER NO",
      dataIndex: "orderNo",
      key: "orderNo",
      filtered: true,
    },
  ];

  return {
    orderTableColumns,
  };
};
