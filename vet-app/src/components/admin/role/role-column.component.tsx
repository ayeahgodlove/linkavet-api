import { ColumnsType } from "antd/es/table";
import { IRole } from "../../../models/role.model";

export const useRoleColumn = () => {
  const roleTableColumns: ColumnsType<IRole> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return {
    roleTableColumns,
  };
};
