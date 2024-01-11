import EnrollmentDetailComponent from "components/admin/lms/enrollment/enrollment-detail.component";
import { EnrollmentForm } from "components/admin/lms/enrollment/enrollment-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminEnrollmentDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editEnrollment = () => {
    setWidth("60rem");
    setTitle("Edit new enrollment");
    setContent(<EnrollmentForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Enrollment", "Details"]} />

        <TitleBar
          title={"Enrollments"}
          subTitle={"View and edit a enrollment"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editEnrollment}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Enrollments" />
        <EnrollmentDetailComponent />
      </div>
    </>
  );
};

export default AdminEnrollmentDetailPage;
