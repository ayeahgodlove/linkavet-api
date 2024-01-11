import { ColumnsType } from "antd/es/table";
import { IConsultation } from "models/health/consultation";
import { format } from "utils/format";

export const useConsultationColumn = () => {
  const consultationTableColumns: ColumnsType<IConsultation> = [
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
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (_, record) => format.date(record.startDate),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (_, record) => format.date(record.endDate),
    },
  ];
  return {
    consultationTableColumns,
  };
};
