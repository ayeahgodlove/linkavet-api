import ProductDetailComponent from "components/admin/product/product-detail.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "hooks/auth/auth.hook";
import { useProduct } from "hooks/product.hook";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const AdminProductDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const {product} = useProduct();
  const navigate = useNavigate();
  
  const editProduct = () => {
    navigate(`/admin/products/${slugify(product.name, "-")}/edit`)
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
          handleShow={editProduct}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Posts" />
        <ProductDetailComponent />
      </div>
    </>
  );
};

export default AdminProductDetailPage;
