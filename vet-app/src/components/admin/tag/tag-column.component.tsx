import { ColumnsType } from "antd/es/table";
import { ITag } from "models/tag.model";

export const tagTableColumns: ColumnsType<ITag> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "6rem",
    filtered: true,
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
];
