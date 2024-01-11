import { Button, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useModalContext } from "context/app-modal.context";
import { IQuiz } from "models/lms/quiz";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { QuizForm } from "./quiz-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";

export const useQuizColumns = () => {
  const { setContent, setShow, setTitle, setWidth } = useModalContext();

  const editCommand = () => {
    setTitle("Edit a Quiz");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <QuizForm formMode={UpdateMode.EDIT} />
      </>
    );
  };
  const quizTableColumns: ColumnsType<IQuiz> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, record, index) => <span key={record.id}>{index + 1}</span>,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answers",
      dataIndex: "answers",
      key: "answers",
      render: (_, record) =>
        record.answers.map((rec, index) => (
          <Tag
            key={rec}
            color={index === record.correctAnswerIndex ? "green" : "magenta"}
          >
            {rec}
          </Tag>
        )),
    },
    {
      title: "Corrent Answer Index",
      dataIndex: "correctAnswerIndex",
      key: "correctAnswerIndex",
    },
    {
      title: "Command",
      dataIndex: "command",
      key: "command",
      render: (_, record) => (
        <Button key={record.id} size="small" onClick={editCommand}>
          <FiEdit />
        </Button>
      ),
    },
  ];

  return {
    quizTableColumns,
  };
};
