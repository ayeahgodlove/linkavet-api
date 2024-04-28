import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { reviewTableColumns } from "./review-column.component";
import { IReview } from "../../../models/review.model";
import { useReview } from "../../../hooks/review.hook";
import { NoContent } from "../../../components/shared/no-content/no-content.component";

type Prop = {
  createReview: () => void
}
const ReviewTable: React.FC<Prop> = ({ createReview }) => {
  const { reviews, setReview } = useReview();
  const router = useNavigate();
  // const route = use
  const handleRowClick = (review: IReview) => {
    setReview(review);
    router(`/admin/reviews/${review.id}`);
  };

  return (
    <>
      {reviews && reviews.length ? (
        <Table<IReview>
          dataSource={reviews}
          columns={reviewTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: IReview) => {
            return {
              onClick: (e) => {
                console.log(e)
                handleRowClick(record);
              },
            };
          }}
        />
      ) : (
        <NoContent
          title="No data for review"
          showButton={true}
          buttonLabel="Add Review"
          handleClick={createReview}
        />
      )}
    </>
  );
};

export default ReviewTable;
