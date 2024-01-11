import { PostForm } from "components/admin/post/post-form.component";
import PostTable from "components/admin/post/post-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchPostsAsync } from "redux/post.slice";

const AdminPostPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const createPost = () => {
    setWidth("60rem")
    setContent(<PostForm formMode={UpdateMode.ADD} />);
    setTitle("Create new post");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchPostsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Posts"]} />
        <TitleBar
          title={"Posts"}
          subTitle={"View and Create Posts"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createPost}
          icon={<FiPlus />}
        />
        <PostTable />
      </div>
    </>
  );
};

export default AdminPostPage;
