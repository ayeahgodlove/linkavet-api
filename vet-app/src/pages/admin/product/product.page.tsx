import ProductTable from "components/admin/product/product-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminProductPage: React.FC = () => {
  const { isLoading } = useAuth();

const navigate = useNavigate();
  const createProduct = () => {
    navigate("/admin/products/create")
  };

  useEffect(() => {
    // dispatch(fetchProductsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Products"]} />
        <TitleBar
          title={"Products"}
          subTitle={"View and Create Products"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createProduct}
          icon={<FiPlus />}
        />
        <ProductTable />
      </div>
    </>
  );
};

export default AdminProductPage;
