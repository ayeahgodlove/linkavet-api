import React, { useCallback, useEffect } from "react";
import { useTag } from "hooks/tag.hook";
import { Space, Tag } from "antd";
import { ITag } from "models/tag.model";
import { TagService } from "services/tag.service";
import { useDispatch } from "react-redux";
import { fetchtagSuccess } from "redux/tag.slice";
import { generateShadesOfColor, tagColor } from "utils/tag-generator";

const TagList = () => {
  const { tags } = useTag();
  const dispatch = useDispatch();

  const handleChange = (tag: ITag) => {
    console.log(tag);
  };

  const getTags = useCallback(async () => {
    const response = await TagService.list();
    dispatch(fetchtagSuccess(response.data));
  }, []);

  const shades = generateShadesOfColor(tagColor, tags.length);

  useEffect(() => {
    getTags();
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Space size={"small"} wrap>
          {tags.map((tag, index) => (
            <Tag
              key={tag.id}
              onChange={() => handleChange(tag)}
              color={shades[index]}
            >
              {tag.name}
            </Tag>
          ))}
        </Space>
      </div>
    </>
  );
};

export default TagList;
