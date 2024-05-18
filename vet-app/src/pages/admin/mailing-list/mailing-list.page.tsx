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
import { UpdateMode } from "models/shared/update-mode.enum";

const MailingListsPage = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();
  const dispatch = useDispatch();

  const createMail = () => {
    setWidth("40rem");
    setContent(<MailingForm formMode={UpdateMode.ADD} />);
    setTitle("Create new mail");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchMailsAsync() as any);
  }, [isLoading]);

  return (
    <div style={{ margin: "1rem" }}>
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
    </div>
  );
};

export default MailingListsPage;
