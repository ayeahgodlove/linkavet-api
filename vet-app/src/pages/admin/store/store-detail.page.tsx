import StoreDetailComponent from "components/admin/store/store-detail.component";
import StoreForm from "components/admin/store/store-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminStoreDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();

  const editStore = () => {
    setTitle("Edit new store");
    setContent(<StoreForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Store", "Details"]} />

        <TitleBar
          title={"Stores"}
          subTitle={"View and edit a store"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editStore}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Stores" />
        <StoreDetailComponent />
      </div>
    </>
  );
};

export default AdminStoreDetailPage;
