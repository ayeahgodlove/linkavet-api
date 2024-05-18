import { useDispatch } from "react-redux";
import MailTable from "../../../components/admin/mailing-list/mail-table.component";
import MailingForm from "../../../components/admin/mailing-list/mailing-form.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { fetchMailsAsync } from "../../../redux/mail.slice";

const MailingListsPage = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();

  const createMail = () => {
    setContent(<MailingForm />);
    setTitle("Create new mail");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchMailsAsync() as any);
  }, []);

  return (
    <>
      <PageBreadCrumbs items={["Mailing Lists", "Mails"]} />
      <TitleBar
        title={"Mails"}
        subTitle={"View and Create Mails"}
        showButton={true}
        buttonLabel={"Add Record"}
        handleShow={createMail}
        icon={<FiPlus />}
      />
      <MailTable />
    </>
  );
};

export default MailingListsPage;
