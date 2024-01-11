import { Button } from "antd";
import AppointmentDetailComponent from "components/admin/heath/appointment/appointment-detail.component";
import AppointmentForm from "components/admin/heath/appointment/appointment-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminAppointmentDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editAppointment = () => {
    setWidth("60rem");
    setTitle("Edit new appointment");
    setContent(<AppointmentForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Appointment", "Details"]} />
        <TitleBar
          title={"Appointments"}
          subTitle={"View and edit a appointment"}
          icon={<FiEdit />}
          showExtra
          extra={
            <Button onClick={editAppointment} type="primary">
              Edit Appointment
            </Button>
          }
        />
        <BackButton title="Appointments" />
        <AppointmentDetailComponent />
      </div>
    </>
  );
};

export default AdminAppointmentDetailPage;
