import { ColumnsType } from "antd/es/table";
import { IDocument } from "models/document";
import { format } from "utils/format";

export const documentTableColumns: ColumnsType<IDocument> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5rem",
    filtered: true,
  },
  {
    title: "SLUD",
    dataIndex: "slud",
    key: "slud",
    width: "5rem",
    filtered: true,
  },
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "5rem",
    filtered: true,
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "UPLOADED AT",
    dataIndex: "uploadDate",
    key: "uploadDate",
    render: (_, record) => format.date(record.uploadDate),
  },
  {
    title: "USER",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    filtered: true,
  },
];
