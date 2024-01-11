import StoreForm from "components/admin/store/store-form.component";
import { StoreTable } from "components/admin/store/store-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchStoresAsync } from "redux/store.slice";

const AdminStorePage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow } = useModalContext();

  const createStore = () => {
    setContent(<StoreForm formMode={UpdateMode.ADD} />);
    setTitle("Create new store");
    setShow(true);
  };

  useEffect(() => {
    // dispatch(fetchStoresAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Stores"]} />
        <TitleBar
          title={"Stores"}
          subTitle={"View and Create Stores"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createStore}
          icon={<FiPlus />}
        />
        <StoreTable />
      </div>
    </>
  );
};

export default AdminStorePage;
