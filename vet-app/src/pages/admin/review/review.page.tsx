import { ReviewForm } from "components/admin/review/review-form.component";
import ReviewTable from "components/admin/review/review-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchReviewsAsync } from "redux/review.slice";

const AdminReviewPage: React.FC = () => {
  const { isLoading } = useAuth();
  useEffect(() => {}, [isLoading]);
  const { setContent, setTitle, setShow } = useModalContext();
  const dispatch = useDispatch();

  const createReview = () => {
    setContent(<ReviewForm formMode={UpdateMode.ADD} />);
    setTitle("Create new review");
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchReviewsAsync() as any);
  }, []);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Review"]} />
        <TitleBar
          title={"Reviews"}
          subTitle={"View and Create Reviews"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createReview}
          icon={<FiPlus />}
        />
        <ReviewTable createReview={createReview} />
      </div>
    </>
  );
};

export default AdminReviewPage;
