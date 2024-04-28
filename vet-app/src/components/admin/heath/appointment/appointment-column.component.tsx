import { Badge, Tag, TimePicker, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useUser } from "../../../../hooks/user.hook";
import { IAppointment } from "../../../../models/health/appointment";
import { STATUS } from "../../../../models/shared/status.enum";
import React from "react";
import { format } from "../../../../utils/format";

export const useAppointmentColumn = () => {
  const { getUser } = useUser();
  const appointmentTableColumns: ColumnsType<IAppointment> = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      filtered: true,
      render: (_, _record, index) => index + 1,
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => (
        <Typography.Text>{record.fullName}</Typography.Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (_, record) => format.date(record.appointmentDate),
    },
    {
      title: "Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (_, record) => (
        <TimePicker
          defaultValue={dayjs(record.appointmentTime)} // Initial value, null in this case
          format={"HH:mm:ss"} // Time format, you can customize it as needed
          style={{ width: 100 }} // Set width of the TimePicker
          clearIcon={false}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Is Confirmed",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
      render: (_, record) =>
        record.isConfirmed ? (
          <Badge color="green" text="YES" />
        ) : (
          <Badge color="#941c50" text="NO" />
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.status === STATUS.APPROVED ? (
          <Tag color="#87d068">{record.status}</Tag>
        ) : record.status === STATUS.PENDING ? (
          <Tag color="#941c50">{record.status}</Tag>
        ) : (
          <Tag color="#f50">{record.status}</Tag>
        ),
      filters: [
        { text: STATUS.APPROVED, value: STATUS.APPROVED },
        { text: STATUS.PENDING, value: STATUS.PENDING },
        { text: STATUS.CANCELED, value: STATUS.CANCELED },
      ],
      onFilter: (value: any, record ) => record.status.indexOf(value) === 0
    },
  ];

  const userAppointmentColumns: ColumnsType<IAppointment> = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      filtered: true,
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Doctor",
      dataIndex: "doctorId",
      key: "doctorId",
      render: (_, record) =>
        getUser(record.doctorId).firstname +
        " " +
        getUser(record.doctorId).lastname,
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (_, record) => format.date(record.appointmentDate),
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (_, record) => (
        <TimePicker
          defaultValue={dayjs(record.appointmentTime)} // Initial value, null in this case
          format={"HH:mm:ss"} // Time format, you can customize it as needed
          style={{ width: 100 }} // Set width of the TimePicker
          clearIcon={false}
          bordered={false}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.status === STATUS.APPROVED ? (
          <Tag color="#87d068">{record.status}</Tag>
        ) : record.status === STATUS.PENDING ? (
          <Tag color="#941c50">{record.status}</Tag>
        ) : (
          <Tag color="#f50">{record.status}</Tag>
        ),
    },
    {
      title: "Is Confirmed",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
      render: (_, record) =>
        record.isConfirmed ? (
          <Badge color="green" text="YES" />
        ) : (
          <Badge color="#941c50" text="NO" />
        ),
    },
  ];
  return {
    appointmentTableColumns,
    userAppointmentColumns,
  };
};
