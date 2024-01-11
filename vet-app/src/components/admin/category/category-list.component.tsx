import React, { useCallback, useEffect } from "react";
import { useCategory } from "hooks/category.hook";
import { Space, Tag } from "antd";
import { ICategory } from "models/category.model";
import { CategoryService } from "services/category.service";
import { useDispatch } from "react-redux";
import { fetchcategorySuccess } from "redux/category.slice";
import { baseColor, generateShadesOfColor } from "utils/tag-generator";

const CategoryList = () => {
  const { categories } = useCategory();
  const dispatch = useDispatch();

  const handleChange = (category: ICategory) => {
    console.log(category);
  };

  const getCategories = useCallback(async () => {
    const response = await CategoryService.list();
    dispatch(fetchcategorySuccess(response.data));
  }, []);

  const shades = generateShadesOfColor(baseColor, categories.length);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <Space size={"small"} wrap>
          {categories.map((category, index) => (
            <span key={index + category.id}>
              <Tag
                key={category.id}
                onChange={() => handleChange(category)}
                color={shades[index]}
              >
                {category.name}
              </Tag>
            </span>
          ))}
        </Space>
      </div>
    </>
  );
};

export default CategoryList;
