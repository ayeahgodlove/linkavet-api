import OrderTable from "components/admin/order/order-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrdersAsync } from "redux/order.slice";

const AdminOrderPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Orders"]} />
        <TitleBar
          title={"Orders"}
          subTitle={"View orders"}
        />
        <OrderTable />
      </div>
    </>
  );
};

export default AdminOrderPage;
