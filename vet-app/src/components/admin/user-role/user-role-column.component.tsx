import { ColumnsType } from "antd/es/table";
import { useRole } from "hooks/role.hook";
import { useUser } from "hooks/user.hook";
import { IUserRole } from "models/user-role.model";

export const useUserRoleColumn = () => {
  const { getUser } = useUser();
  const { getRole } = useRole();
  const userRoleTableColumns: ColumnsType<IUserRole> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
      render(value, record, index) {
        console.log(value, record)
        return index + 1;
      },
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => getUser(record.userId).username,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => getUser(record.userId).email,
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
      render: (_, record) => getUser(record.userId).phoneNumber,
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      render: (_, record) => getRole(record.roleId).name,
    },
  ];

  return {
    userRoleTableColumns,
  };
};
