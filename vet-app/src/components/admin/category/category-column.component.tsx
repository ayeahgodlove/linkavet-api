import { ColumnsType } from "antd/es/table";
import { ICategory } from "models/category.model";
import { format } from "utils/format";

export const categorieTableColumns: ColumnsType<ICategory> = [
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
  {
    title: "SLUG",
    dataIndex: "slug",
    key: "slug",
    filtered: true,
  },
];
