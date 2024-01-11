import PaymentDetailComponent from "components/admin/payment/payment-detail.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "hooks/auth/auth.hook";
import React, { useEffect } from "react";

const AdminPaymentDetailPage: React.FC = () => {
  const { isLoading } = useAuth();


  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Payment", "Details"]} />

        <TitleBar
          title={"Payments"}
          subTitle={"View payment details"}
          showExtra
        />
        <BackButton title="Payments" />
        <PaymentDetailComponent />
      </div>
    </>
  );
};

export default AdminPaymentDetailPage;
