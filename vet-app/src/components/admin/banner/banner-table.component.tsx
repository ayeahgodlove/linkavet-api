import { Button, Card, Col, Empty, Input, Table, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { bannerTableColumns } from "./banner-column.component";
import BannerForm from "./banner-form.component";

import { useDispatch } from "react-redux";
import slugify from "slugify";
import { useModalContext } from "context/app-modal.context";
import { useBanner } from "hooks/banner.hook";
import { useNavigate } from "react-router-dom";
import { UpdateMode } from "models/shared/update-mode.enum";
import { IBanner } from "models/banner";
import search from "utils/search";
import { fetchbannerSuccess } from "redux/banner.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { API_URL } from "config/constant";

const { Search } = Input;
export function BannerTable() {
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const { banners, initialFetch, setBanner } = useBanner();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setTitle("Create a Banner");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <BannerForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getBanners = useCallback(async (): Promise<IBanner[]> => {
    setLoading(true)
    const response = await fetch(`${API_URL}/api/banners`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultBanners: IBanner[] = banners.filter((client) =>
    search(client, ["title"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value)
  }

  const handleRowClick = (banner: IBanner) => {
    setBanner(banner);
    router(`/admin/banners/${slugify(banner.title, "-")}`);
  };

  const { Paragraph } = Typography;
  
  const inputRef = useRef(null);
  
  useEffect(() => {
    (async () => {
      const bannerDATas = await getBanners();
      dispatch(fetchbannerSuccess([...bannerDATas]));
      setLoading(false)
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Banners loading..." height="65vh" />;
  }
  return (
    <>
      {banners && banners.length > 0 ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search placeholder="Search by name" onChange={(banner) => onChange(banner)} />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table
            columns={bannerTableColumns}
            dataSource={resultBanners && resultBanners.length > 0 ? resultBanners : banners}
            style={{ borderRadius: 0 }}
            rowKey={"id"}
            onRow={(record: IBanner) => {
              return {
                onClick: () => {
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}  
          />
        </Card>
      ) : (
        <Empty
          style={{ backgroundColor: "#f3f3f3", padding: "2rem" }}
          description={
            <>
              <Paragraph style={{ marginBottom: 10 }}>
                No banners at this moment
              </Paragraph>
              <Button type="primary" onClick={handleClick}>
                Create Banner
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
