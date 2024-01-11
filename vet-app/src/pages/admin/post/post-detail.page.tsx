import PostDetailComponent from "components/admin/post/post-detail.component";
import { PostForm } from "components/admin/post/post-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import {  FiEdit } from "react-icons/fi";

const AdminPostDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editPost = () => {
    setWidth("60rem")
    setTitle("Edit new post");
    setContent(<PostForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Post", "Details"]} />

        <TitleBar
          title={"Posts"}
          subTitle={"View and edit a post"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editPost}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Posts" />
        <PostDetailComponent />
      </div>
    </>
  );
};

export default AdminPostDetailPage;
