import { TagForm } from "components/admin/tag/tag-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminTagDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  
  const editTag = () => {
    setContent(<TagForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new tag");
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Tag Edit Page</h1>
      </div>
    </>
  );
};

export default AdminTagDetailPage;
