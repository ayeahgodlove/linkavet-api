import QuizDetailComponent from "components/admin/lms/quiz/quiz-detail.component";
import { QuizForm } from "components/admin/lms/quiz/quiz-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminQuizDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editQuiz = () => {
    setWidth("60rem");
    setTitle("Edit new quiz");
    setContent(<QuizForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Quiz", "Details"]} />

        <TitleBar
          title={"Quizes"}
          subTitle={"View and edit a quiz"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editQuiz}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Quizs" />
        <QuizDetailComponent />
      </div>
    </>
  );
};

export default AdminQuizDetailPage;
