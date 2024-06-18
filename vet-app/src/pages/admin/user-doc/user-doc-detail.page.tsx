import UserDocDetailComponent from "../../../components/admin/user-doc/user-doc-detail.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import BackButton from "../../../components/shared/back-button.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useAuth } from "../../../hooks/auth/auth.hook";
import React, { useEffect } from "react";

const AdminUserDocDetailPage: React.FC = () => {
  const { isLoading } = useAuth();

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["User Documents", "Details"]} />

        <TitleBar
          title={"User Documents"}
          subTitle={"View Document"}
        />
        <BackButton title="UserDocs" />
        <UserDocDetailComponent />
      </div>
    </>
  );
};

export default AdminUserDocDetailPage;
