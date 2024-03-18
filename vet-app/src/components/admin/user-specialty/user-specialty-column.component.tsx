import { ColumnsType } from "antd/es/table";
import { useUser } from "hooks/user.hook";
import { IUserSpecialty } from "models/user-specialty.model";

export const useUserSpecialtyColumn = () => {
  const {getUser} = useUser();
  const userSpecialtyTableColumns: ColumnsType<IUserSpecialty> = [
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
    userSpecialtyTableColumns,
  };
};
