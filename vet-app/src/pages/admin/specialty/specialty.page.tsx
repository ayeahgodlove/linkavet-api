import { SpecialtyForm } from "../../../components/admin/specialty/specialty-form.component";
import SpecialtyTable from "../../../components/admin/specialty/specialty-table.component";
import TitleBar from "../../../components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "../../../components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchSpecialtiesAsync } from "../../../redux/specialty.slice";

const AdminSpecialtyPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();

  const createSpecialty = () => {
    setContent(<SpecialtyForm isTrue={true} formMode={UpdateMode.ADD} />);
    setTitle("Create new tag");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchSpecialtiesAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["s", "Specialty"]} />
        <TitleBar
          title={"Tags"}
          subTitle={"View Specialities"}
          showButton={false}
          buttonLabel={"Add Record"}
          handleShow={createSpecialty}
          icon={<FiPlus />}
        />
        <SpecialtyTable />
      </div>
    </>
  );
};

export default AdminSpecialtyPage;
