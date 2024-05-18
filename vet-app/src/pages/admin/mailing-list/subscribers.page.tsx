import SubscriberTable from "components/admin/mailing-list/subscriber-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "../../../hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchSubscribersAsync } from "../../../redux/subscriber.slice";

const SubscribersPage = () => { 

  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchSubscribersAsync() as any);
  }, []);

  return (
    <div style={{ margin: "1rem" }}>
      <PageBreadCrumbs items={["Mailing Lists", "subscriber"]} />
      <TitleBar
        title={"subscribers"}
        subTitle={"View and Create subscribers"}
        showButton={false}
        icon={<FiPlus />}
      />
      <SubscriberTable />
    </div>
  );
};

export default SubscribersPage;
