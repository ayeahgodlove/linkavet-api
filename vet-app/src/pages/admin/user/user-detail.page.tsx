import { UserForm } from "components/admin/user/user-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminUserDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  
  const editUser = () => {
    setContent(<UserForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new user");
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> User Edit Page</h1>
      </div>
    </>
  );
};

export default AdminUserDetailPage;
