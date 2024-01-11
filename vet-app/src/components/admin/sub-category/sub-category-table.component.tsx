import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { subSubCategoryTableColumns } from "./sub-category-column.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useSubCategory } from "hooks/sub-category.hook";
import { ISubCategory } from "models/category.model";

type Prop = {
  createSubCategory: () => void
}
const SubCategoryTable: React.FC<Prop> = ({ createSubCategory }) => {
  const { subCategories, setSubCategory } = useSubCategory();
  const router = useNavigate();
  // const route = use
  const handleRowClick = (category: ISubCategory) => {
    setSubCategory(category);
    router(`/admin/sub-categories/${category.slug}`);
  };

  return (
    <>
      {subCategories && subCategories.length ? (
        <Table<ISubCategory>
          dataSource={subCategories}
          columns={subSubCategoryTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: ISubCategory) => {
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
          title="No data for Sub Category"
          showButton={true}
          buttonLabel="Add Sub Category"
          handleClick={createSubCategory}
        />
      )}
    </>
  );
};

export default SubCategoryTable;
