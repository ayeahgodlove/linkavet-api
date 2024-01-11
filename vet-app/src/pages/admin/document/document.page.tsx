import { Modal } from "antd";
import { DocumentForm } from "components/admin/document/document-form.component";
import DocumentTable from "components/admin/document/document-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchDocumentsAsync } from "redux/document.slice";

const AdminDocumentPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();

  const createDocument = () => {
    setContent(<DocumentForm formMode={UpdateMode.ADD} />);
    setTitle("Create new document");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchDocumentsAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Documents"]} />
        <TitleBar
          title={"Documents"}
          subTitle={"View and Create Documents"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createDocument}
          icon={<FiPlus />}
        />
        <DocumentTable createDocument={createDocument} />
      </div>
    </>
  );
};

export default AdminDocumentPage;
