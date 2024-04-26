import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { categorieTableColumns } from "./category-column.component";
import { ICategory } from "models/category.model";
import { useCategory } from "hooks/category.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useModalContext } from "context/app-modal.context";
import { useDispatch } from "react-redux";
import { CategoryForm } from "./category-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import search from "utils/search";
import { fetchcategorySuccess } from "redux/category.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { API_URL } from "config/constant";

const { Search } = Input;

const CategoryTable: React.FC = () => {
  const { categories, setCategory, initialFetch } = useCategory();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createCategory = () => {
    setTitle("Create a Category");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <CategoryForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getCategories = useCallback(async (): Promise<ICategory[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/categories`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultCategories: ICategory[] = categories.filter((client) =>
    search(client, ["name"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (category: ICategory) => {
    setCategory(category);
    router(`/admin/categories/${category.slug}`);
  };

  useEffect(() => {
    (async () => {
      const categoryDATas = await getCategories();
      dispatch(fetchcategorySuccess([...categoryDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Categories loading..." height="65vh" />;
  }

  return (
    <>
      {categories && categories.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(banner) => onChange(banner)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<ICategory>
            dataSource={
              resultCategories && resultCategories.length > 0
                ? resultCategories
                : categories
            }
            columns={categorieTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: ICategory) => {
              return {
                onClick: (e) => {
                  console.log(e);
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <NoContent
          title="No data for category"
          showButton={true}
          buttonLabel="Add Category"
          handleClick={createCategory}
        />
      )}
    </>
  );
};

export default CategoryTable;
