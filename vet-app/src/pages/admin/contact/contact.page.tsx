import {ContactTable} from "../../../components/admin/contact/contact-table.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../../redux/contact.slice";

const AdminContactPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchContactsAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Contact"]} />
        <TitleBar
          title={"Contacts"}
          subTitle={"View Contacts"}
          icon={<FiPlus />}
        />
        <ContactTable />
      </div>
    </>
  );
};

export default AdminContactPage;
