import PaymentTable from "components/admin/payment/payment-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPaymentsAsync } from "redux/payment.slice";

const AdminPaymentPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPaymentsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Payments"]} />
        <TitleBar
          title={"Payments"}
          subTitle={"View payments"}
        />
        <PaymentTable />
      </div>
    </>
  );
};

export default AdminPaymentPage;
