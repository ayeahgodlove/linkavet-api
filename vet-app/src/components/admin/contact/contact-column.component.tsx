import { ColumnsType } from "antd/es/table";
import { IContact } from "../../../models/contact";

export const contactTableColumns: ColumnsType<IContact> = [
  {
    title: "Serial",
    dataIndex: "id",
    key: "id",
    filtered: true,
    render: (_, _record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    ellipsis: true
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    ellipsis: true
  },
];
