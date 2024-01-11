import { Button, message } from "antd";
import BannerDetailComponent from "components/admin/banner/banner-detail.component";
import BannerForm from "components/admin/banner/banner-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useBanner } from "hooks/banner.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminBannerDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  const { banner, delBanner } = useBanner();
  const navigate = useNavigate();
  const onDelete = async () => {
    const feedback = await delBanner(banner);
    if (feedback) {
      message.success(`${banner.title} banner deleted successfully!`);
      navigate("/admin/banners");
    } else {
      message.error(`${banner.title} banner not deleted`);
    }
  };
  const editBanner = () => {
    setContent(<BannerForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new banner");
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Banner", "Details"]} />

        <TitleBar
          title={"Banners"}
          subTitle={"View and edit a banner"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editBanner}
          icon={<FiEdit />}
          showExtra
          extra={
            <Button danger type="default" onClick={onDelete} shape="circle">
              <AiFillDelete size={25} />{" "}
            </Button>
          }
        />
        <BackButton title="Banners" />
        <BannerDetailComponent />
      </div>
    </>
  );
};

export default AdminBannerDetailPage;
