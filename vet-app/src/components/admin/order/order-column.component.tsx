import { ColumnsType } from "antd/es/table";
import { useUser } from "hooks/user.hook";
import { IOrder } from "models/order.model";

export const useOrderColumn = () => {
  const { getUser } = useUser();

  const orderTableColumns: ColumnsType<IOrder> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // width: '20rem',
      filtered: true,
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
