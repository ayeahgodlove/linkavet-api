import { Button, message } from "antd";
import ContactDetailComponent from "../../../components/admin/contact/contact-detail.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import BackButton from "../../../components/shared/back-button.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { useContact } from "../../../hooks/contact.hook";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminContactDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { contact, delContact } = useContact();
  const navigate = useNavigate();
  const onDelete = async () => {
    const feedback = await delContact(contact);
    if (feedback) {
      message.success(`${contact.name} contact deleted successfully!`);
      navigate("/admin/contacts");
    } else {
      message.error(`${contact.name} contact not deleted`);
    }
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Contact", "Details"]} />

        <TitleBar
          title={"Contacts"}
          subTitle={"View and edit a contact"}
          showExtra
          extra={
            <Button danger type="default" onClick={onDelete} shape="circle">
              <AiFillDelete size={25} />{" "}
            </Button>
          }
        />
        <BackButton title="Contacts" />
        <ContactDetailComponent />
      </div>
    </>
  );
};

export default AdminContactDetailPage;
