import { Button, Tabs, TabsProps } from "antd";
import LessonDetailComponent from "components/admin/lms/lesson/lesson-detail.component";
import { LessonForm } from "components/admin/lms/lesson/lesson-form.component";
import { QuizForm } from "components/admin/lms/quiz/quiz-form.component";
import QuizTable from "components/admin/lms/quiz/quiz-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useLesson } from "hooks/lms/lesson.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";

const items: TabsProps["items"] = [
  {
    key: "0",
    label: "Detail",
    children: <LessonDetailComponent />,
  },
  {
    key: "1",
    label: "Quiz",
    children: <QuizTable />,
  },
];

const AdminLessonDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { lesson } = useLesson();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState(queryParams.get("tab") || "0");
  const navigate = useNavigate();

  const editLesson = () => {
    setWidth("60rem");
    setTitle("Edit new lesson");
    setContent(<LessonForm formMode={UpdateMode.EDIT} />);
    setShow(true); 
  };

  const createQuiz = () => {
    setWidth("40rem");
    setTitle("Create Quiz");
    setContent(<QuizForm formMode={UpdateMode.ADD} />);
    setShow(true);
  };

  const onChange = (activeKey: string) => {
    setStatus(activeKey);
    navigate(
      `/admin/lessons/${slugify(lesson.title, {
        lower: true,
        replacement: "-",
      })}?tab=${activeKey}`
    );
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Lesson", "Details"]} />
        <TitleBar
          title={"Lessons"}
          subTitle={"View and edit a lesson"}
          icon={<FiEdit />}
          showExtra
          extra={
            <>
              {status === "0" ? (
                <Button onClick={editLesson} type="primary">
                  Edit Lesson
                </Button>
              ) : (
                <Button onClick={createQuiz} type="primary">
                  Create Quiz
                </Button>
              )}
            </>
          }
        />
        <BackButton title="Lessons" />
        <Tabs defaultActiveKey={status} items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default AdminLessonDetailPage;
