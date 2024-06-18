import CategoryDetailComponent from "../../../components/admin/category/category-detail.component";
import { CategoryForm } from "../../../components/admin/category/category-form.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import BackButton from "../../../components/shared/back-button.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminCategoryDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  const editCategory = () => {
    setContent(<CategoryForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new category");
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Category", "Details"]} />
        <TitleBar
          title={"Categories"}
          subTitle={"View and edit a category"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editCategory}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Categories" />
        <CategoryDetailComponent />
      </div>
    </>
  );
};

export default AdminCategoryDetailPage;
