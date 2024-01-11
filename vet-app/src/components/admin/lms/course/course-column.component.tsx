import { Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { API_URL_UPLOADS_COURSES } from "config/constant";
import { ICourse } from "models/lms/course";
import React from "react";

export const courseTableColumns: ColumnsType<ICourse> = [
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
    title: "CourseImage",
    dataIndex: "courseImage",
    key: "courseImage",
    render: (_, record) => (
      <Image
        width={100}
        height={100}
        src={`${API_URL_UPLOADS_COURSES}/${record.courseImage}`}
        alt={record.title}
      />
    ),
  },
];
