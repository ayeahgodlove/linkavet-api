import { Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import { IAppointment } from "models/health/appointment";
import React from "react";
import { format } from "utils/format";

export const useAppointmentColumn = () => {
  const appointmentTableColumns: ColumnsType<IAppointment> = [
    {
      title: "Serial",
      dataIndex: "id",
      key: "id",
      filtered: true,
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Pet Owner",
      dataIndex: "petOwnerId",
      key: "petOwnerId",
    },
    {
      title: "Vet Doctor",
      dataIndex: "vetDoctorId",
      key: "vetDoctorId",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (_, record) => format.date(record.appointmentDateTime),
    },
    {
      title: "Duration",
      dataIndex: "durationMinutes",
      key: "durationMinutes",
    },
    {
      title: "Is Confirmed",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
      render: (_, record) =>
        record.isConfirmed ? (
          <Badge color="green" text="YES" />
        ) : (
          <Badge color="red" text="NO" />
        ),
    },
  ];
  return {
    appointmentTableColumns,
  };
};
