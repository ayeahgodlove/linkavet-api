import { ColumnsType } from "antd/es/table";
import { ISubscriber } from "../../../models/subscriber.model";

export const useSubscriberColumn = () => {
  const subscriberTableColumns: ColumnsType<ISubscriber> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return {
    subscriberTableColumns,
  };
};
