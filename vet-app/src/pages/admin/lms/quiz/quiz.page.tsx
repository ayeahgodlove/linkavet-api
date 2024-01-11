import { QuizForm } from "components/admin/lms/quiz/quiz-form.component";
import QuizTable from "components/admin/lms/quiz/quiz-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchQuizsAsync } from "redux/lms/quiz.slice";

const AdminQuizPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createQuiz = () => {
    setWidth("60rem");
    setContent(<QuizForm formMode={UpdateMode.ADD} />);
    setTitle("Create new quiz");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchQuizsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Quizs"]} />
        <TitleBar
          title={"Quizs"}
          subTitle={"View and Create Quizs"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createQuiz}
          icon={<FiPlus />}
        />
        <QuizTable />
      </div>
    </>
  );
};

export default AdminQuizPage;
