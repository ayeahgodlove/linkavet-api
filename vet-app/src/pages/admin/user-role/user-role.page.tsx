import { UserRoleForm } from "components/admin/user-role/user-role-form.component";
import UserRoleTable from "components/admin/user-role/user-role-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchUserRolesAsync } from "redux/user-role.slice";

const AdminUserRolePage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();


  const createUserRole = () => {
    setContent(<UserRoleForm formMode={UpdateMode.ADD} />);
    setTitle("Create new User Role");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchUserRolesAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "User Role"]} />
        <TitleBar
          title={"User Roles"}
          subTitle={"View and Create User Roles"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createUserRole}
          icon={<FiPlus />}
        />
        <UserRoleTable />
      </div>
    </>
  );
};

export default AdminUserRolePage;
