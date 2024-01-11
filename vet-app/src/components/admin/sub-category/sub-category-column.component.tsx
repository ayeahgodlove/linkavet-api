import { ColumnsType } from "antd/es/table";
import { ISubCategory } from "models/category.model";

export const subSubCategoryTableColumns: ColumnsType<ISubCategory> = [
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
