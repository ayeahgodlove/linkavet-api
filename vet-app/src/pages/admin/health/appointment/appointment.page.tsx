import AppointmentForm from "components/admin/heath/appointment/appointment-form.component";
import { AppointmentTable } from "components/admin/heath/appointment/appointment-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchAppointmentsAsync } from "redux/health/appointment.slice";

const AdminAppointmentPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createAppointment = () => {
    setWidth("60rem");
    setContent(<AppointmentForm formMode={UpdateMode.ADD} />);
    setTitle("Create new appointment");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchAppointmentsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Appointments"]} />
        <TitleBar
          title={"Appointments"}
          subTitle={"View and Create Appointments"}
          // showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createAppointment}
          icon={<FiPlus />}
        />
        <AppointmentTable />
      </div>
    </>
  );
};

export default AdminAppointmentPage;
