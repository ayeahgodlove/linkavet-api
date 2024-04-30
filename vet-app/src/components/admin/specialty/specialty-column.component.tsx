import { ColumnsType } from "antd/es/table";
import { useUser } from "../../../hooks/user.hook";
import { ISpecialty } from "../../../models/specialty.model";

export const useSpecialtyColumn = () => {
  const {getUser} = useUser();
  const specialtyTableColumns: ColumnsType<ISpecialty> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
    },
    {
      title: "USER",
      dataIndex: "user",
      key: "user",
      render: (_, record) => getUser(record.userId)?.username
    },
    {
      title: "SPECIALTY",
      dataIndex: "specialty",
      key: "specialty",
    },
  ];

  return {
    specialtyTableColumns,
  };
};
