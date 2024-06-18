import { ColumnsType } from "antd/es/table";
import { useUser } from "../../../hooks/user.hook";
import { IUserDoc } from "../../../models/user-doc.model";
import { Image } from "antd";
import { API_URL_UPLOADS_USER_DOCS } from "config/constant";
import React from "react";

export const useUserDocColumn = () => {
  const { getUser } = useUser();
  const userDocTableColumns: ColumnsType<IUserDoc> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
      render(value, record, index) {
        console.log(value, record);
        return index + 1;
      },
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => getUser(record.userId).username,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => getUser(record.userId).email,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Image
          width={50}
          height={50}
          src={`${API_URL_UPLOADS_USER_DOCS}/${record.photo}`}
          alt={record.id}
        />
      ),
    },
   
  ];

  return {
    userDocTableColumns,
  };
};
