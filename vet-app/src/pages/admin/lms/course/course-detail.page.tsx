import { Button, Tabs, TabsProps } from "antd";
import CourseDetailComponent from "components/admin/lms/course/course-detail.component";
import CourseForm from "components/admin/lms/course/course-form.component";
import { LessonForm } from "components/admin/lms/lesson/lesson-form.component";
import LessonTable from "components/admin/lms/lesson/lesson-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useCourse } from "hooks/lms/course.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";

const items: TabsProps["items"] = [
  {
    key: "0",
    label: "Detail",
    children: <CourseDetailComponent />,
  },
  {
    key: "1",
    label: "Lessons",
    children: <LessonTable />,
  },
];

const AdminCourseDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();
  const { course } = useCourse();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState(queryParams.get("tab") || "0");
  const navigate = useNavigate();

  const createLesson = () => {
    setWidth("60rem");
    setContent(<LessonForm formMode={UpdateMode.ADD} />);
    setTitle("Create new lesson");
    setShow(true);
  };

  const editCourse = () => {
    setWidth("60rem");
    setTitle("Edit new course");
    setContent(<CourseForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  const onChange = (activeKey: string) => {
    setStatus(activeKey);
    navigate(
      `/admin/courses/${slugify(course.title, {
        lower: true,
        replacement: "-",
      })}?tab=${activeKey}`
    );
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Course", "Details"]} />

        <TitleBar
          title={"Courses"}
          subTitle={"View and edit a course"}
          handleShow={editCourse}
          icon={<FiEdit />}
          showExtra
          extra={
            <>
              {status === "0" ? (
                <Button onClick={editCourse} type="primary">
                  Edit Course
                </Button>
              ) : (
                <Button onClick={createLesson} type="primary">
                  Create Lessons
                </Button>
              )}
            </>
          }
        />
        <BackButton title="Courses" />
        <Tabs defaultActiveKey={status} items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default AdminCourseDetailPage;
