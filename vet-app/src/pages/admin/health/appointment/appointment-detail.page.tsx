import { Button, ConfigProvider, message, Space } from "antd";
import AppointmentDetailComponent from "components/admin/heath/appointment/appointment-detail.component";
import AppointmentForm from "components/admin/heath/appointment/appointment-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { STATUS } from "models/shared/status.enum";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiCancelOutline } from "react-icons/ti";
import { FcApprove } from "react-icons/fc";
import { useAppointment } from "hooks/health/appointment.hook";
import { IAppointment } from "models/health/appointment";

const AdminAppointmentDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();
  const { setAppointment, appointment, editAppointment } = useAppointment();
  const [loading, setLoading] = useState(false);
  const approveAppointment = () => {
    setAppointment({
      ...appointment,
      status: STATUS.APPROVED,
      isConfirmed: true,
    });
    setWidth("30rem");
    setTitle("Edit new appointment");
    setContent(<AppointmentForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };
  const cancelAppointment = async () => {
    setLoading(true);
    const feedback = await editAppointment({
      ...appointment,
      status: STATUS.CANCELED,
      isConfirmed: false,
    });
    if (feedback) {
      message.success("Appointment cancelled successfully!");
    } else {
      message.error("failed to cancel");
    }
    setLoading(false);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Health", "Appointment", "Details"]} />
        <TitleBar
          title={"Appointments"}
          subTitle={"View and edit a appointment"}
          icon={<FiEdit />}
          showExtra
          extra={
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#941c50",
                },
              }}
            >
              <Space>
                <Button onClick={approveAppointment} type="default">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FcApprove size={25} /> <span>{STATUS.APPROVED}</span>
                  </div>
                </Button>
                
                <Button
                  loading={loading}
                  onClick={cancelAppointment}
                  type="primary"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TiCancelOutline size={25} /> <span>{STATUS.CANCELED}</span>
                  </div>
                </Button>
              </Space>
            </ConfigProvider>
          }
        />
        <BackButton title="Appointments" />
        <AppointmentDetailComponent />
      </div>
    </>
  );
};

export default AdminAppointmentDetailPage;
