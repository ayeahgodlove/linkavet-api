import { Modal } from "antd";
import { CategoryForm } from "components/admin/category/category-form.component";
import CategoryTable from "components/admin/category/category-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "redux/category.slice";

const AdminCategoryPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();


  const createCategory = () => {
    setContent(<CategoryForm formMode={UpdateMode.ADD} />);
    setTitle("Create new category");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Category"]} />
        <TitleBar
          title={"Categories"}
          subTitle={"View and Create Categories"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createCategory}
          icon={<FiPlus />}
        />
        <CategoryTable />
      </div>
    </>
  );
};

export default AdminCategoryPage;
