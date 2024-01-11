import { ColumnsType } from "antd/es/table";
import { ILesson } from "models/lms/lesson";
import React from "react";
export const useLessonColumn = () => {
  const lessonTableColumns: ColumnsType<ILesson> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "3rem",
      render: (_, record: any, index) => (
        <span key={record.id}>{index + 1}</span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
    },
  ];

  return {
    lessonTableColumns,
  };
};
