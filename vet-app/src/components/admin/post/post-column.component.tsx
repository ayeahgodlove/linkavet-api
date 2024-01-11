import { ColumnsType } from "antd/es/table";
import { useAuth } from "hooks/auth/auth.hook";
import { useCategory } from "hooks/category.hook";
import { IPost } from "models/post";
import { format } from "utils/format";

export const usePostColumn = () => {
  const { user } = useAuth();
  const { categories } = useCategory();

  const postTableColumns: ColumnsType<IPost> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5rem",
      filtered: true,
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      filtered: true,
    },
    {
      title: "PUBLISHED AT",
      dataIndex: "publishedAt",
      key: "publishedAt",
      render: (_, record) => format.date(record.publishedAt),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      render: () => user.username,
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
    postTableColumns,
  };
};
