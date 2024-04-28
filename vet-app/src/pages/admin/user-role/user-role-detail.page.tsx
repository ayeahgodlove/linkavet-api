import { UserRoleForm } from "../../../components/admin/user-role/user-role-form.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminUserRoleDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  
  const editUserRole = () => {
    setContent(<UserRoleForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new User Role");
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> UserRole Edit Page</h1>
      </div>
    </>
  );
};

export default AdminUserRoleDetailPage;
