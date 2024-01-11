import { ColumnsType } from "antd/es/table";
import { useUser } from "hooks/user.hook";
import { IPayment } from "models/payment.model";

export const usePaymentColumn = () => {
  const { getUser } = useUser();

  const paymentTableColumns: ColumnsType<IPayment> = [
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
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
  ];

  return {
    paymentTableColumns,
  };
};
