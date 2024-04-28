import { UserForm } from "../../../components/admin/user/user-form.component";
import UserTable from "../../../components/admin/user/user-table.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchUsersAsync } from "../../../redux/user.slice";

const AdminUserPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();


  const createUser = () => {
    setContent(<UserForm formMode={UpdateMode.ADD} />);
    setTitle("Create new user");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchUsersAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "User"]} />
        <TitleBar
          title={"Users"}
          subTitle={"View and Create Users"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createUser}
          icon={<FiPlus />}
        />
        <UserTable />
      </div>
    </>
  );
};

export default AdminUserPage;
