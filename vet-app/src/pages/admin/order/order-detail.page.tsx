import OrderDetailComponent from "components/admin/order/order-detail.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "hooks/auth/auth.hook";
import React, { useEffect } from "react";

const AdminOrderDetailPage: React.FC = () => {
  const { isLoading } = useAuth();


  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Order", "Details"]} />

        <TitleBar
          title={"Orders"}
          subTitle={"View order details"}
          showExtra
        />
        <BackButton title="Orders" />
        <OrderDetailComponent />
      </div>
    </>
  );
};

export default AdminOrderDetailPage;
