import { RoleForm } from "components/admin/role/role-form.component";
import RoleTable from "components/admin/role/role-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchRolesAsync } from "redux/role.slice";

const AdminRolePage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();


  const createRole = () => {
    setContent(<RoleForm formMode={UpdateMode.ADD} />);
    setTitle("Create new role");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchRolesAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Role"]} />
        <TitleBar
          title={"Roles"}
          subTitle={"View and Create Roles"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createRole}
          icon={<FiPlus />}
        />
        <RoleTable />
      </div>
    </>
  );
};

export default AdminRolePage;
