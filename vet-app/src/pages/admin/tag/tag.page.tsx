import { TagForm } from "components/admin/tag/tag-form.component";
import TagTable from "components/admin/tag/tag-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchTagsAsync } from "redux/tag.slice";

const AdminTagPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();


  const createTag = () => {
    setContent(<TagForm formMode={UpdateMode.ADD} />);
    setTitle("Create new tag");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchTagsAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Tag"]} />
        <TitleBar
          title={"Tags"}
          subTitle={"View and Create Tags"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createTag}
          icon={<FiPlus />}
        />
        <TagTable />
      </div>
    </>
  );
};

export default AdminTagPage;
