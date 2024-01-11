import { ReviewForm } from "components/admin/review/review-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminReviewDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();

  const editReview = () => {
    setContent(<ReviewForm formMode={UpdateMode.EDIT} />);
    setTitle("Edit new review");
    setShow(true);
  };
  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Review Edit Page</h1>
      </div>
    </>
  );
};

export default AdminReviewDetailPage;
