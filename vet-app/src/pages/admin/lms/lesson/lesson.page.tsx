import { LessonForm } from "components/admin/lms/lesson/lesson-form.component";
import LessonTable from "components/admin/lms/lesson/lesson-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchLessonsAsync } from "redux/lms/lesson.slice";

const AdminLessonPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createLesson = () => {
    setWidth("60rem");
    setContent(<LessonForm formMode={UpdateMode.ADD} />);
    setTitle("Create new lesson");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchLessonsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Lessons"]} />
        <TitleBar
          title={"Lessons"}
          subTitle={"View and Create Lessons"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createLesson}
          icon={<FiPlus />}
        />
        <LessonTable />
      </div>
    </>
  );
};

export default AdminLessonPage;
