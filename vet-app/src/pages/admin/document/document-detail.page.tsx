import { DocumentForm } from "components/admin/document/document-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminDocumentDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();

  const editDocument = () => {
    setTitle("Edit new document");
    setContent(<DocumentForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };
  
  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Document Page</h1>
      </div>
    </>
  );
};

export default AdminDocumentDetailPage;
