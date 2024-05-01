import React from "react";

import { Table, Divider, Button } from "antd";
import { FiTrash } from "react-icons/fi";

export default function ActivityProfile() {
  const handleDelete = (text) => {
    console.log(text);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "IP",
      dataIndex: "ip",
      width: 200,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "#",
      dataIndex: "action",
      align: "right",
      render: (text) => <FiTrash onClick={() => handleDelete(text)} />,
    },
  ];

  const data: any = [
    {
      key: "1",
      name: "Chrome on Window	",
      ip: "278.281.987.111",
      time: "Department",
      action: "Delete",
    },
    {
      key: "2",
      name: "Chrome on Mac",
      ip: "211.281.456.111",
      time: "Nov 12, 2019 08:56 PM",
      action: "Delete",
    },
    {
      key: "3",
      name: "Chrome on Window	",
      ip: "278.281.987.111",
      time: "Department",
      action: "Delete",
    },
    {
      key: "4",
      name: "Chrome on Mac",
      ip: "211.281.456.111",
      time: "Nov 12, 2019 08:56 PM",
      action: "Delete",
    },
    {
      key: "5",
      name: "Chrome on Window	",
      ip: "278.281.987.111",
      time: "Department",
      action: "Delete",
    },
    {
      key: "6",
      name: "Chrome on Mac",
      ip: "211.281.456.111",
      time: "Nov 12, 2019 08:56 PM",
      action: "Delete",
    },
  ];

  return (
    <>
      <h2>Login Activity</h2>
      <p>Here is your last 10 login activities log.</p>

      <Divider />

      <Table
        columns={columns as any}
        dataSource={data}
        pagination={{ position: ["none"] }}
        size="middle"
      />
    </>
  );
}
