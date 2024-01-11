import ConsultationForm from "components/admin/heath/consultation/consultation-form.component";
import { ConsultationTable } from "components/admin/heath/consultation/consultation-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchConsultationsAsync } from "redux/health/consultation.slice";

const AdminConsultationPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createConsultation = () => {
    setWidth("60rem");
    setContent(<ConsultationForm formMode={UpdateMode.ADD} />);
    setTitle("Create new consultation");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchConsultationsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Consultations"]} />
        <TitleBar
          title={"Consultations"}
          subTitle={"View and Create Consultations"}
          // showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createConsultation}
          icon={<FiPlus />}
        />
        <ConsultationTable />
      </div>
    </>
  );
};

export default AdminConsultationPage;
