import CourseForm from "components/admin/lms/course/course-form.component";
import { CourseTable } from "components/admin/lms/course/course-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchCoursesAsync } from "redux/lms/course.slice";

const AdminCoursePage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createCourse = () => {
    setWidth("60rem");
    setContent(<CourseForm formMode={UpdateMode.ADD} />);
    setTitle("Create new course");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchCoursesAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Courses"]} />
        <TitleBar
          title={"Courses"}
          subTitle={"View and Create Courses"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createCourse}
          icon={<FiPlus />}
        />
        <CourseTable />
      </div>
    </>
  );
};

export default AdminCoursePage;
