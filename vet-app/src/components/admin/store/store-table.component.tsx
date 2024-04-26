import { Button, Card, Col, Empty, Input, Table, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { storeTableColumns } from "./store-column.component";
import StoreForm from "./store-form.component";

import { useDispatch } from "react-redux";
import slugify from "slugify";
import { useModalContext } from "context/app-modal.context";
import { useStore } from "hooks/store.hook";
import { useNavigate } from "react-router-dom";
import { UpdateMode } from "models/shared/update-mode.enum";
import { IStore } from "models/store";
import search from "utils/search";
import { fetchstoreSuccess } from "redux/store.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { API_URL } from "config/constant";

const { Search } = Input;
export function StoreTable() {
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const { stores, initialFetch, setStore } = useStore();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setTitle("Create a Store");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <StoreForm formMode={UpdateMode.ADD} />
      </>
    );
  };

  const getStores = useCallback(async (): Promise<IStore[]> => {
    setLoading(true)
    const response = await fetch(`${API_URL}/api/stores`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultStores: IStore[] = stores.filter((store) =>
    search(store, ["name"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value)
  }

  const handleRowClick = (store: IStore) => {
    setStore(store);
    router(`/admin/stores/${slugify(store.name, "-")}`);
  };

  const { Paragraph } = Typography;
  
  const inputRef = useRef(null);
  
  useEffect(() => {
    (async () => {
      const storeDATas = await getStores();
      dispatch(fetchstoreSuccess([...storeDATas]));
      setLoading(false)
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Stores loading..." height="65vh" />;
  }
  return (
    <>
      {stores && stores.length > 0 ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search placeholder="Search by name" onChange={(store) => onChange(store)} />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table
            columns={storeTableColumns}
            dataSource={resultStores && resultStores.length > 0 ? resultStores : stores}
            style={{ borderRadius: 0 }}
            rowKey={"id"}
            onRow={(record: IStore) => {
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
                No stores at this moment
              </Paragraph>
              <Button type="primary" onClick={handleClick}>
                Create Store
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
