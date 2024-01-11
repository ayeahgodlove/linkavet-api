import BannerForm  from "components/admin/banner/banner-form.component";
import {BannerTable} from "components/admin/banner/banner-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchBannersAsync } from "redux/banner.slice";

const AdminBannerPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();


  const createBanner = () => {
    setContent(<BannerForm formMode={UpdateMode.ADD} />);
    setTitle("Create new banner");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchBannersAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Banner"]} />
        <TitleBar
          title={"Banners"}
          subTitle={"View and Create Banners"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createBanner}
          icon={<FiPlus />}
        />
        <BannerTable />
      </div>
    </>
  );
};

export default AdminBannerPage;
