import UserDocTable from "../../../components/admin/user-doc/user-doc-table.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "../../../hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchUserDocsAsync } from "../../../redux/user-doc.slice";

const AdminUserDocPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDocsAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "User Documents"]} />
        <TitleBar
          title={"User Documents"}
          subTitle={"Review User Documents"}
          icon={<FiPlus />}
        />
        <UserDocTable />
      </div>
    </>
  );
};

export default AdminUserDocPage;
