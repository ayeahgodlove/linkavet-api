import { Button } from "antd";
import ConsultationDetailComponent from "components/admin/heath/consultation/consultation-detail.component";
import ConsultationForm from "components/admin/heath/consultation/consultation-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminConsultationDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editConsultation = () => {
    setWidth("60rem");
    setTitle("Edit new consultation");
    setContent(<ConsultationForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Consultation", "Details"]} />
        <TitleBar
          title={"Consultations"}
          subTitle={"View and edit a consultation"}
          icon={<FiEdit />}
          showExtra
          extra={
            <Button onClick={editConsultation} type="primary">
              Edit Consultation
            </Button>
          }
        />
        <BackButton title="Consultations" />
        <ConsultationDetailComponent />
      </div>
    </>
  );
};

export default AdminConsultationDetailPage;
