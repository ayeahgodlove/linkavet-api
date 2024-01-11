import { Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { API_URL_UPLOADS_STORES } from "config/constant";
import { IStore } from "models/store";
import React from "react";

export const storeTableColumns: ColumnsType<IStore> = [
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
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (_, record) => <Image width={100} height={100} src={`${API_URL_UPLOADS_STORES}/${record.imageBannerUrl}`} alt={record.name} />
  },
];
