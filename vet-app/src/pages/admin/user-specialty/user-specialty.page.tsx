import { UserSpecialtyForm } from "components/admin/user-specialty/user-specialty-form.component";
import UserSpecialtyTable from "components/admin/user-specialty/user-specialty-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchUserSpecialtiesAsync } from "redux/user-specialty.slice";

const AdminUserSpecialtyPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();

  const createSpecialty = () => {
    setContent(<UserSpecialtyForm isTrue={true} formMode={UpdateMode.ADD} />);
    setTitle("Create new tag");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchUserSpecialtiesAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Users", "Specialty"]} />
        <TitleBar
          title={"Tags"}
          subTitle={"View Specialities"}
          showButton={false}
          buttonLabel={"Add Record"}
          handleShow={createSpecialty}
          icon={<FiPlus />}
        />
        <UserSpecialtyTable />
      </div>
    </>
  );
};

export default AdminUserSpecialtyPage;
