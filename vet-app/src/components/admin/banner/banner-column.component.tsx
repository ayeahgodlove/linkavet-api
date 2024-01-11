import { Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { API_URL_UPLOADS_BANNERS } from "config/constant";
import { IBanner } from "models/banner";
import React from "react";

export const bannerTableColumns: ColumnsType<IBanner> = [
  {
    title: "Serial",
    dataIndex: "id",
    key: "id",
    filtered: true,
    render: (_, _record, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "subTitle",
    key: "subTitle",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (_, record) => <Image width={100} height={100} src={`${API_URL_UPLOADS_BANNERS}/${record.image}`} alt={record.title} />
  },
];
