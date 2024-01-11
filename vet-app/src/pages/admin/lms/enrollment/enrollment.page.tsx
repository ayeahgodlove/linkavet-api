import { EnrollmentForm } from "components/admin/lms/enrollment/enrollment-form.component";
import EnrollmentTable from "components/admin/lms/enrollment/enrollment-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchEnrollmentsAsync } from "redux/lms/enrollment.slice";

const AdminEnrollmentPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createEnrollment = () => {
    setWidth("60rem");
    setContent(<EnrollmentForm formMode={UpdateMode.ADD} />);
    setTitle("Create new enrollment");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchEnrollmentsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Enrollments"]} />
        <TitleBar
          title={"Enrollments"}
          subTitle={"View and Create Enrollments"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createEnrollment}
          icon={<FiPlus />}
        />
        <EnrollmentTable />
      </div>
    </>
  );
};

export default AdminEnrollmentPage;
