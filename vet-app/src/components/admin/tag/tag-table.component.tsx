import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { tagTableColumns } from "./tag-column.component";
import { ITag } from "../../../models/tag.model";
import { useTag } from "../../../hooks/tag.hook";
import { NoContent } from "../../../components/shared/no-content/no-content.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useDispatch } from "react-redux";
import { TagForm } from "./tag-form.component";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import search from "../../../utils/search";
import { fetchtagSuccess } from "../../../redux/tag.slice";
import { SpinnerComponent } from "../../../components/shared/spinner";
import slugify from "slugify";
import { API_URL } from "../../../config/constant";

const { Search } = Input;

const TagTable: React.FC = () => {
  const { tags, setTag } = useTag();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createTag = () => {
    setTitle("Create a Tag");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <TagForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getTags = useCallback(async (): Promise<ITag[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/tags`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultTags: ITag[] = tags.filter((client) =>
    search(client, ["name"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (tag: ITag) => {
    setTag(tag);
    router(`/admin/tags/${slugify(tag.name, '-')}`);
  };

  useEffect(() => {
    (async () => {
      const tagDATas = await getTags();
      console.log("tagDATas: ", tagDATas)
      dispatch(fetchtagSuccess([...tagDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Tags loading..." height="65vh" />;
  }

  return (
    <>
      {tags && tags.length ? (
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
          <Table<ITag>
            dataSource={
              resultTags && resultTags.length > 0
                ? resultTags
                : tags
            }
            columns={tagTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: ITag) => {
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
          title="No data for tag"
          showButton={true}
          buttonLabel="Add Tag"
          handleClick={createTag}
        />
      )}
    </>
  );
};

export default TagTable;
