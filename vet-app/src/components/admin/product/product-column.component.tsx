import { ColumnsType } from "antd/es/table";
import { useAuth } from "hooks/auth/auth.hook";
import { useCategory } from "hooks/category.hook";
import { IProduct } from "models/product.model";
import { format } from "utils/format";

export const useProductColumn = () => {
  const { user } = useAuth();
  const { categories } = useCategory();

  const productTableColumns: ColumnsType<IProduct> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5rem",
      filtered: true,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      filtered: true,
    },
    {
      title: "USER",
      dataIndex: "user",
      key: "user",
      render: () => user.username, //show right users not logged in user
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      filtered: true,
      render: (_, record) => categories.find((c) => c.id === record.categoryId)?.name,
    },
  ];

  return {
    productTableColumns,
  };
};
